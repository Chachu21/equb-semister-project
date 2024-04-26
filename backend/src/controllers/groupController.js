import Group from "../models/groups.js";
import User from "../models/users.js";
import { errorHandler } from "../utils/errorHandler.js";

// //create a new group
// export const createGroup = async (req, res) => {
//   const { name, amount, member, types } = req.body;
//   const createdBy = req.user;
//   console.log(req.body);
//   try {
//     // Validate input (optional)
//     if (!name || !amount || !types || !createdBy || !member) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Validate existence of creator user
//     const creator = await User.findById(createdBy);
//     if (!creator) {
//       return res
//         .status(400)
//         .json({ message: "user is not found, validate your account" });
//     }

//     const newGroup = new Group({
//       name,
//       amount,
//       member,
//       types,
//       createdBy,
//       members: [createdBy], // Add creator as a member
//     });

//     await newGroup.save();
//     res
//       .status(201)
//       .json({ message: "Group created successfully", group: newGroup });
//   } catch (err) {
//     errorHandler(err, res, 5000);
//   }
// };
export const createGroup = async (req, res) => {
  const { name, amount, member, types } = req.body;
  const createdBy = req.user;

  try {
    if (!name || !amount || !types || !createdBy || !member) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const creator = await User.findById(createdBy);
    if (!creator) {
      return res
        .status(400)
        .json({ message: "User not found, please validate your account" });
    }

    const newGroup = new Group({
      name,
      amount,
      member,
      types,
      createdBy,
      members: [createdBy],
    });

    await newGroup.save();

    // Categorize the group based on its status
    switch (newGroup.status) {
      case "completed":
        await Group.updateOne(
          { _id: newGroup._id },
          { $addToSet: { completedGroups: newGroup._id } }
        );
        break;
      case "started":
        await Group.updateOne(
          { _id: newGroup._id },
          { $addToSet: { started: newGroup._id } }
        );
        break;
      case "pending":
        await Group.updateOne(
          { _id: newGroup._id },
          { $addToSet: { pendingGroups: newGroup._id } }
        );
        break;
      default:
        break;
    }

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (err) {
    errorHandler(err, res, 500);
  }
};

//get all groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    // console.log(groups);
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroup = async (req, res) => {
  const { id } = req.params; // Extract group ID from request parameters

  try {
    const group = await Group.findById(id).populate("members"); // Use findById to find by ID

    if (!group) {
      return res.status(404).json({ message: "Group not found" }); // Handle not found case
    }

    res.status(200).json({ group }); // Return the retrieved group
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: err.message }); // Send the specific error message
  }
};
 // Import Group model or adjust as per your file structure

export const getUserJoinedGroups = async (req, res) => {
  console.log("At getUserJoinedGroups controller");
  try {
    const userId = req.params.id;

    // Find groups where the logged-in user's ID is present in the members array
    const userGroups = await Group.find({ members: userId }).exec();
    console.log("User groups:", userGroups);
    res.status(200).json(userGroups);
  } catch (error) {
    console.error("Error fetching user's joined groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller method to fetch groups joined by the logged-in user
// export const getUserJoinedGroups = async (req, res) => {
//   console.log("am at getUserJoinedGroups controller");
//   try {
//     const userId = req.params.id;
   
    
//     // Find groups where the logged-in user's ID is present in the members array
//     const userGroups = await Group.find({ members: userId }).exec();
//     console.log("user groups kkkkkkkkkkkkk");
//     res.status(200).json(userGroups);
//   } catch (error) {
//     console.error("Error fetching user's joined groups:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//delete single group by id
export const deleteGroup = async (req, res) => {
  const { id } = req.params; // Extract group ID from request parameters

  try {
    const deletedGroup = await Group.findByIdAndDelete(id); // Find by ID and delete

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" }); // Handle not found case
    }

    res.status(200).json({ message: "Group deleted successfully" }); // Success response
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Handle internal errors
  }
};

export const joinGroup = async (req, res) => {
  const { groupId } = req.params; // Extract group ID from request parameters
  const userId = req.user; // Assuming user ID is decoded from JWT token
  
  try {
    // 1. Check if the user is already a member of the group
    const group = await Group.findById(groupId).populate("members"); // Populate members with userId

    if (!group) {
      console.log("Group not found");
      return res.status(404).json({ message: "Group not found" });
    }

    // 2. Check if the user is already a member of the group (using populated userIds)
    if (group.members.some((member) => member === userId)) {
      console.log("User already in group");
      return res.status(400).json({ error: "UserAlreadyJoined" });
    }

    // 3. Add user to the group's members array
    group.members.push(userId); // Directly update the document (triggers middleware)

    // 4. Save the updated group document
    const updateddata = await group.save(); // This will trigger the middleware
    if (!updateddata) {
      throw new Error("Failed to save EqubGroup");
    }
    console.log(updateddata);
    res.status(200).json({ message: "Joined group successfully" });
  } catch (err) {
    console.error("from server", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//for searching and pagination

export const getGroups = async (req, res) => {
  try {
    const { types, amount, member, page = 1, pageSize = 10 } = req.query; // Set defaults for page and pageSize

    const conditions = [];

    if (types) {
      // Allow searching by multiple types (if applicable)
      conditions.push({ types: { $in: types } });
    }

    if (amount) {
      try {
        const parsedAmount = parseInt(amount);
        conditions.push({ amount: { $eq: parsedAmount } });
      } catch (error) {
        return res.status(400).json({ error: "Invalid amount format" });
      }
    }

    if (member) {
      try {
        const parsedMembers = parseInt(member);
        conditions.push({ member: { $eq: parsedMembers } });
      } catch (error) {
        return res.status(400).json({ error: "Invalid members format" });
      }
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};

    const options = {
      page: parseInt(page), // Use parsed page number
      limit: parseInt(pageSize), // Use parsed page size
      sort: { createdOn: -1 }, // Sort by creation date (descending)
    };

    try {
      const searchResult = await Group.paginate(query, options);
      res.json({
        searchResult: searchResult.docs, // Extract documents from paginated result
        totalPages: searchResult.totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Catch any other potential errors
  }
};
<<<<<<< .merge_file_iZjfA5

// for update group by inserting user in to winners list by removing on group members array
export const winnersList = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findById(id);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  //if group exist remove single member from members array and add to winners list
  const { userId } = req.body; // Extract user ID from request body
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const indexInMembers = group.members.indexOf(userId);
  const indexInWinners = group.winners.indexOf(userId);
  if (indexInMembers > -1) {
    if (indexInWinners === -1) {
      // Remove user from members array and add to winners list
      group.members.splice(indexInMembers, 1);
      group.winners.push(userId);
      group.save();
      return res.status(200).json({ message: "User added to winners list" });
    } else {
      return res
        .status(400)
        .json({ message: "User is already in winners list" });
    }
  } else {
    return res.status(400).json({ message: "User not in group" });
  }
};
export const getGroupByUserId = async (req, res) => {
  try {
    const userId = req.user;

    // Check if user is already in the database
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already in a group
    const group = await Group.find({ members: { $in: [userId] } });
    if (!group || group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Counting groups based on status
    const pendingGroups = group.filter((gr) => gr.status === "pending").length;
    const completedGroups = group.filter(
      (gr) => gr.status === "completed"
    ).length;
    const startedGroups = group.filter((gr) => gr.status === "started").length;

    return res.status(200).json({
      message: "User is already in a group",
      group,
      count: {
        no_pending: pendingGroups,
        no_started: startedGroups,
        no_completed: completedGroups,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
=======
>>>>>>> .merge_file_1e3IdF

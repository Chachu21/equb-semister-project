import Group from "../models/groups.js";
import User from "../models/users.js";
import { errorHandler } from "../utils/errorHandler.js";

//create a new group
export const createGroup = async (req, res) => {
  const { name, amount, member, types } = req.body;
  const createdBy = req.user;
  console.log(req.body);
  try {
    // Validate input (optional)
    if (!name || !amount || !types || !createdBy || !member) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate existence of creator user
    const creator = await User.findById(createdBy);
    if (!creator) {
      return res
        .status(400)
        .json({ message: "user is not found, validate your account" });
    }

    const newGroup = new Group({
      name,
      amount,
      member,
      types,
      createdBy,
      members: [createdBy], // Add creator as a member
    });

    await newGroup.save();
    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (err) {
    errorHandler(err, res, 5000);
  }
};

// //get all groups
// export const getGroups = async (req, resp) => {
//   const { page = 1, limit = 10 } = req.query; // Default page and limit

//   try {
//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: { createdOn: -1 }, // Optional: sort by creation date descending
//     };

//     const groups = await Group.paginate({}, options); // Empty query {} for all groups

//     res.status(200).json({ groups });
//   } catch (err) {
//     handleError(err, res);
//   }
// };

//get single group by id
export const getGroup = async (req, res) => {
  const { id } = req.params; // Extract group ID from request parameters

  try {
    const group = await Group.findById(id); // Use findById to find by ID

    if (!group) {
      return res.status(404).json({ message: "Group not found" }); // Handle not found case
    }

    res.status(200).json({ group }); // Return the retrieved group
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Handle internal errors
  }
};

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

// for  joining the group

export const joinGroup = async (req, res) => {
  const { groupId } = req.params; // Extract group ID from request parameters
  const userId = req.user; // Assuming user ID is decoded from JWT token

  try {
    // Check if the user is already a member of the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is already a member of the group
    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group" });
    }

    // Add user to the group's members array
    await Group.findByIdAndUpdate(groupId, {
      $addToSet: { members: userId }, // Add user ID to the members array (avoids duplicates)
    });

    res.status(200).json({ message: "Joined group successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//for searching and pagination

export const getGroups = async (req, res) => {
  try {
    const { types, amount, members, page = 1, pageSize = 10 } = req.query; // Set defaults for page and pageSize

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

    if (members) {
      try {
        const parsedMembers = parseInt(members);
        conditions.push({ members: { $eq: parsedMembers } });
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

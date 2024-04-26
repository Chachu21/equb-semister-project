import sendSMS from "../config/sendSMS.js";
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
      members: [],
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
      case "unstarted":
        await Group.updateOne(
          { _id: newGroup._id },
          { $addToSet: { unstartedGroups: newGroup._id } }
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

// Assuming you have a `User` model with a field `paid`

// export const joinGroup = async (req, res) => {
//   const { groupId } = req.params;
//   const userId = req.user;
//   console.log("user id is", userId);
//   try {
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: "Group not found" });
//     }

//     if (group.members.includes(userId)) {
//       return res.status(400).json({ error: "UserAlreadyJoined" });
//     }

//     if (group.status === 'pending' && group.members.length !== group.member) {
//       await Group.findByIdAndUpdate(groupId, {
//         $addToSet: { members: userId },
//         startDate: Date.now(),
//       });
//     }

//     const user = await User.findById(userId);
//     const { phone, name: userName } = user;

//     const { name: groupName } = group;
//     const message = `Hey ${userName}, you have successfully joined the ${groupName} equb group!`;

//     const latestGroup = await Group.findById(groupId);
//     console.log(message);

//     if (latestGroup.members.length === latestGroup.member) {
//       const thisGroup = await Group.findByIdAndUpdate(groupId, { status: "started" });
//       console.log("members length", thisGroup.members.length);

//       const rounds = group.member;
//       const paymentDeadline = new Date(Date.now() + 1 * 60 * 1000);
//       await Group.findByIdAndUpdate(groupId, { paymentDeadline });

//       const paymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${paymentDeadline.toLocaleString()}. Please make your payments before this time 1st round.`;
//       console.log(paymentMessage);

//       await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//       for (let round = 1; round <= rounds; round++) {
//         const groupUpdated = await Group.findById(groupId);
//         const allPaid=true
//         //TODO
//         //add paid at user models
//         //const allPaid = groupUpdated.members.every(memberId => memberId.paid);

//         if (!allPaid) {
//           console.log(`Not all members have paid for round ${round}. Skipping winner selection.`);
//           break;
//         }

//         const eligibleMembers = groupUpdated.members.filter((member) => !groupUpdated.winners.includes(member));
//         console.log(`Eligible members for round ${round} are  : `, eligibleMembers);

//         if (eligibleMembers.length === 0) {
//           console.log(`No eligible members left for round ${round}.`);
//           break;
//         }

//         await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//         const winnerId = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
//         const users = await User.findById(winnerId);
//         const { name } = users;
//         console.log(users);

//         const winnerMessage = `Congratulations! ${name} You are the winner of the ${groupUpdated.name} equb group for round ${round}. Please check your account for your prize.`;
//         console.log(winnerMessage);

//         await Group.findByIdAndUpdate(groupId, {
//           $addToSet: { winners: winnerId },
//         });

//         const nextPaymentDeadline = new Date(Date.now() + 1 * 60 * 1000);
//         await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//         const nextRoundPaymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${nextPaymentDeadline.toLocaleString()}. Please make your payments before this time for rounds ${round}.`;
//         console.log(nextRoundPaymentMessage);

//         await Group.findByIdAndUpdate(groupId, {
//           paymentDeadline: nextPaymentDeadline,
//         });

//         groupUpdated.members.forEach(async (memberId) => {
//           await User.findByIdAndUpdate(memberId, { paid: true });
//         });

//         const groupForFinal = await Group.findById(groupId);
//         if (groupForFinal.winners.length === groupForFinal.member) {
//           await Group.findByIdAndUpdate(groupId, {
//             status: "completed",
//             isCompleted: true,
//             startDate: null,
//             paymentDeadline: null
//           });
//           console.log("Group completed successfully.");
//           break;
//         }
//       }
//     }

//     res.status(200).json({ message: "Joined group successfully" });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export  const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user;
  console.log("user id is", userId);
  try {
   const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ error: "UserAlreadyJoined" });
    }
      if( group.status==='pending' && group.members.length !==group.member){
      await Group.findByIdAndUpdate(groupId, {
        $addToSet: { members: userId },
        startDate: Date.now(),
      });
      }
   
      const user = await User.findById(userId);
      const { phone, name: userName } = user;

      const { name: groupName } = group;
     const message = `Hey ${userName}, you have successfully joined the ${groupName} equb group!`;
     
      const latestGroup=await Group.findById(groupId);
       sendSMS(phone, message);
    
      // console.log(message);
    // Check if the count of members equals the specified number of members for the group
    if (latestGroup.members.length === latestGroup.member) {
      // If yes, update the status of the group to "started"
      const thisGroup=await Group.findByIdAndUpdate(groupId, { status: "started" });
      console.log("members length", thisGroup.members.length);
     
      const rounds = group.member; 
      
      // Calculate the payment deadline (1 minute for the first round)
      const paymentDeadline = new Date(Date.now() + 1 * 60 * 1000);

      // Update the paymentDeadline field of the group model
     await Group.findByIdAndUpdate(groupId, { paymentDeadline });

      // Send SMS to announce the payment deadline to all members
      const paymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${paymentDeadline.toLocaleString()}. Please make your payments before this time 1st round.`;
      // group.members.forEach(async (memberId) => {
      //   const member = await User.findById(memberId);
      //   if (member && member.phone) {
      //     sendSMS(member.phone, paymentMessage);
      //   }
      // });
      //sendSMS(phone, paymentMessage);
      console.log(paymentMessage);
      // Wait for another 1 minutes
      await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

     for (let round = 1; round <= rounds; round++) {
       const groupUpdated = await Group.findById(groupId);

       // Exclude previous winners from eligible members
       
       const eligibleMembers = groupUpdated.members.filter(
         (member) => !groupUpdated.winners.includes(member)
       );
       console.log(`Eligible members for round ${round} are  : `, eligibleMembers);

       // Check if there are still eligible members for this round
       if (eligibleMembers.length === 0) {
         console.log(`No eligible members left for round ${round}.`);
         break; // Exit the loop if no eligible members left
       }
           //wait for 1 minutes
         await new Promise((resolve) => setTimeout(resolve, 1* 60 * 1000));
       // Randomly select a winner from the eligible members
       const winnerId = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];

       
        // console.log("userid is",userId)
          const users = await User.findById(winnerId);
          const {  name } = users;
          console.log(users);
       // Send SMS to notify the winner
       const winnerMessage = `Congratulations! ${name}  You are the winner of the ${groupUpdated.name} equb group for  round ${round} . Please check your account for your prize.`;
       console.log(winnerMessage); // Send SMS logic commented for testing
       //  sendSMS(phone, winnerMessage);
       // Update the winners array in the group model
       await Group.findByIdAndUpdate(groupId, {
         $addToSet: { winners: winnerId },
       });

    

       // Update the payment deadline for the next round (1 minute for subsequent rounds)
       const nextPaymentDeadline = new Date(Date.now() + 1 * 60 * 1000);
       //wait for 1 minutes
       await new Promise((resolve) => setTimeout(resolve, 1* 60 * 1000));

       const paymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${nextPaymentDeadline.toLocaleString()}. Please make your payments before this time for rounds ${round} .`;
       console.log(paymentMessage)
       await Group.findByIdAndUpdate(groupId, {
         paymentDeadline: nextPaymentDeadline,
       });

       // Exclude the winner of the current round from the members array for subsequent rounds
       const me = (groupUpdated.members = groupUpdated.members.filter(
         (member) => member !== winnerId
       ));
      
          // Check if all original members have become winners
          const groupForFinal = await Group.findById(groupId);
          //check for their length of winner 
          console.log("group.winners.length ", groupForFinal.winners.length);
           console.log("group.members.length ", groupForFinal.member);
       if (groupForFinal.winners.length === groupForFinal.member) {
         await Group.findByIdAndUpdate(groupId, {
           status: "completed",
           isCompleted: true,
           startDate: null,
           paymentDeadline: null
         });
         console.log("Group completed successfully.");
         break; // Exit the loop if all original members have become winners
       }
     }


    }

    res.status(200).json({ message: "Joined group successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// for  joining the group

// export const joinGroup = async (req, res) => {
//   const { groupId } = req.params; // Extract group ID from request parameters
//   const userId = req.user; // Assuming user ID is decoded from JWT token
  
//   try {
//     // Check if the user is already a member of the group
//     const group = await Group.findById(groupId);
    
//      const {  name: groupName } = group;
     
//     if (!group) {
//       console.log("group not found");
//       return res.status(404).json({ message: "Group not found" });
//     }

//     // Check if the user is already a member of the group
//     if (group.members.includes(userId)) {
//       console.log("user already in group");
//       return res.status(400).json({ error: "UserAlreadyJoined" });
//     }

//     // Add user to the group's members array
//     await Group.findByIdAndUpdate(groupId, {
//       $addToSet: { members: userId }, // Add user ID to the members array (avoids duplicates)
//     });
//      const user = await User.findById(userId);
     
//      const { phone, name: userName } = user;

//      console.log("phone and name of user at group",phone);
//       const message = `hey ${userName} you are sucessfully joined ${groupName} equb group  `;
//       sendSMS(phone, message);
//     res.status(200).json({ message: "Joined group successfully" });
//   } catch (err) {
//     console.error("from server", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const joinGroup = async (req, res) => {
//   const { groupId } = req.params;
//   const userId = req.user;

//   try {
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: "Group not found" });
//     }

//     if (group.members.includes(userId)) {
//       return res.status(400).json({ error: "UserAlreadyJoined" });
//     }

//     await Group.findByIdAndUpdate(groupId, {
//       $addToSet: { members: userId },
//       startDate: Date.now(),
//     });

//     const user = await User.findById(userId);
//     const { phone, name: userName } = user;

//     const { name: groupName } = group;
//     const message = `Hey ${userName}, you have successfully joined the ${groupName} equb group!`;
//     sendSMS(phone, message);

//     // Check if the count of members equals the specified number of members for the group
//     if (group.members.length + 1 === group.member) {
//       // If yes, update the status of the group to "started"
//       // await Group.findByIdAndUpdate(groupId, { status: "started" });
//       group.status="started"
//       // Calculate the payment deadline date (2 minutes after the start date for development purposes)
//       const paymentDeadline = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

//       // Update the paymentDeadline field of the group model
//       await Group.findByIdAndUpdate(groupId, { paymentDeadline });

      // // Send SMS to announce the payment deadline to members
      // const deadlineMessage = `Payment deadline for the ${groupName} equb group is ${paymentDeadline.toLocaleString()}. Please make your payments before this time.`;
      // group.members.forEach(async (memberId) => {
      //   const member = await User.findById(memberId);
      //   if (member && member.phone) {
      //     sendSMS(member.phone, deadlineMessage);
      //   }
      // });
     
     
//     }

//     res.status(200).json({ message: "Joined group successfully" });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//for searching and pagination

// export const joinGroup = async (req, res) => {
//   const { groupId } = req.params;
//   const userId = req.user;
//   console.log("user id is", userId);
//   try {
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: "Group not found" });
//     }

//     if (group.members.includes(userId)) {
//       return res.status(400).json({ error: "UserAlreadyJoined" });
//     }

//     if (group.status === "pending" && group.members.length !== group.member) {
//       await Group.findByIdAndUpdate(groupId, {
//         $addToSet: { members: userId },
//         startDate: Date.now(),
//       });
//     }

//     const user = await User.findById(userId);
//     const { phone, name: userName } = user;

//     const { name: groupName } = group;
//     const message = `Hey ${userName}, you have successfully joined the ${groupName} equb group!`;

//     const latestGroup = await Group.findById(groupId);
//     console.log(message);

//     if (latestGroup.members.length === latestGroup.member) {
//       const thisGroup = await Group.findByIdAndUpdate(groupId, {
//         status: "started",
//       });
//       console.log("members length", thisGroup.members.length);

//       const rounds = group.member;
//       const paymentDeadline = new Date(Date.now() + 1 * 60 * 1000);
//       await Group.findByIdAndUpdate(groupId, { paymentDeadline });

//       const paymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${paymentDeadline.toLocaleString()}. Please make your payments before this time 1st round.`;
//       console.log(paymentMessage);

//       await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//       for (let round = 1; round <= rounds; round++) {
//         const groupUpdated = await Group.findById(groupId);

//         //Check payment status for each round
//         // const allPaid = groupUpdated.members.every(async (memberId) => {
//         //   const member = await User.findById(memberId);
//         //   console.log("member id", memberId);
//         //   return member.paid;
          
//         // });
//         let allPaid=true
//         console.log("is all paid",allPaid);
        
//         // const allPaid=true;

//         if (!allPaid) {
//           console.log(
//             `Not all members have paid for round ${round}. Skipping winner selection.`
//           );
//           break;
//         }

//         const eligibleMembers = groupUpdated.members.filter(
//           (member) => !groupUpdated.winners.includes(member)
//         );
//         console.log(
//           `Eligible members for round ${round} are  : `,
//           eligibleMembers
//         );

//         if (eligibleMembers.length === 0) {
//           console.log(`No eligible members left for round ${round}.`);
//           break;
//         }

//         await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//         const winnerId =
//           eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
//         const users = await User.findById(winnerId);
//         const { name } = users;
//         console.log(users);

//         const winnerMessage = `Congratulations! ${name} You are the winner of the ${groupUpdated.name} equb group for round ${round}. Please check your account for your prize.`;
//         console.log(winnerMessage);

//         await Group.findByIdAndUpdate(groupId, {
//           $addToSet: { winners: winnerId },
//         });

//         const nextPaymentDeadline = new Date(Date.now() + 1 * 60 * 1000);
//         await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

//         const nextRoundPaymentMessage = `Hey ${userName} Payment deadline for the ${groupName} equb group is ${nextPaymentDeadline.toLocaleString()}. Please make your payments before this time for rounds ${round}.`;
//         console.log(nextRoundPaymentMessage);

//         await Group.findByIdAndUpdate(groupId, {
//           paymentDeadline: nextPaymentDeadline,
//         });
// // // Set paid field to false for all users after each round
// // //make false i say true for development purpose
// //         groupUpdated.members.forEach(async (memberId) => {
// //           await User.findByIdAndUpdate(memberId, { paid: false });
// //         });
 


//         const groupForFinal = await Group.findById(groupId);
//         if (groupForFinal.winners.length === groupForFinal.member) {
//           await Group.findByIdAndUpdate(groupId, {
//             status: "completed",
//             isCompleted: true,
//             startDate: null,
//             paymentDeadline: null,
//           });
//           console.log("Group completed successfully.");
//           break;
//         }
//       }
//     }

//     res.status(200).json({ message: "Joined group successfully" });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


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

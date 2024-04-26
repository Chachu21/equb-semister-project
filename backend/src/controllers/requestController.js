
import Request from '../models/userRequest.js'

export const createRequest = async (req, res) => {
   
  try {
    const { equbType, equbTypeLength, amount, numMembers } = req.body;

    // Create a new Equb instance
    const newRequest = new Request({
      equbType,
      equbTypeLength,
      amount,
      numMembers,
    });

    // Save the Equb entry to the database
    await newRequest.save();

    res
      .status(201)
      .json({ message: "Request created successfully", Request: newRequest });
  } catch (error) {
    console.error("Error creating Requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get all Equb entries
 export const getRequests= async (req, res) => {

   try {
     const equbs = await Request.find();
     res.status(200).json(equbs);
   } catch (error) {
     console.error("Error getting Requests:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 };

// Controller function to get a specific Equb entry by ID
 export const getSingleRequest = async (req, res) => {
  
   try {
     const equb = await Request.findById(req.params.id);
     if (!equb) {
       return res.status(404).json({ error: "Requests not found" });
     }
     res.status(200).json(equb);
   } catch (error) {
     console.error("Error getting Requests by ID:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 };

// Controller function to delete a specific Equb entry by ID
 export const deleteRequest = async (req, res) => {
   const { id } = req.params;
  
  try {
    const equb = await Request.findByIdAndDelete(id);
  
    if (!equb) {
      return res.status(404).json({ error: "Request not found" });
    }
   
    // await equb.remove();
    res.status(200).json({ message: "Requests deleted successfully" });
  } catch (error) {
    console.error("Error deleting Equb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a specific Equb entry by ID
 export const updateRequest = async (req, res) => {
  try {
    const { equbType, equbDays, amount, numMembers } = req.body;
    const equb = await Request.findById(req.params.id);
    if (!equb) {
      return res.status(404).json({ error: "Requests not found" });
    }
    equb.equbType = equbType;
    equb.equbTypeLength = equbTypeLength;
    equb.amount = amount;
    equb.numMembers = numMembers;
    await equb.save();
    res.status(200).json({ message: "Requests updated successfully", equb });
  } catch (error) {
    console.error("Error updating Requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

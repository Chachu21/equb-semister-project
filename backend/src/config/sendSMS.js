 import twilio from "twilio";

const accountSid = "AC363b54dafa761aa740cedb74218ed341";
const authToken = "a2bb72b1e49d365dcda8e20c3dd27165";
const twilioPhoneNumber = "+16503824428";
 const recipientPhoneNumber = '+251943438385';
const client = new twilio(accountSid, authToken);

// Function to send SMS notification using Twilio
const sendSMS = async (phoneNumber, messageType) => {
  console.log("am inside sendSMS", phoneNumber, messageType);
  try {
   
    const response = await client.messages.create({
      body: messageType,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber,
    });

    console.log("SMS sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export default sendSMS;
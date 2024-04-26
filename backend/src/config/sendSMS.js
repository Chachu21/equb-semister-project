import twilio from "twilio";

const accountSid = "AC9980d3e5214078768c6ee7073a121d05";
const authToken = "8877b52fb08b36eb06cf35dded9d1d29";
const twilioPhoneNumber = "+13342030015";
const recipientPhoneNumber = "+251 99 486 8854";
const client = new twilio(accountSid, authToken);

// Function to send SMS notification using Twilio
const sendSMS = async (phoneNumber, messageType) => {
  console.log("from sms component", phoneNumber);
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

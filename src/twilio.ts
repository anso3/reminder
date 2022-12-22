import { Twilio } from "twilio"
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new Twilio(accountSid, authToken);


 const send = (message:string, phoneNumber:string) => {
    client.messages
    .create({
        from: twilioNumber,
        to: phoneNumber,
        body: message,
    })
    .then((message) => console.log(message.sid));
     
 }

export default send; 
import userDatabase, { Message } from "./src/message.database.js";
import Service from "./src/message.service.js";
import Cron from "croner";
import send from './src/twilio.js'

const db = new userDatabase();
const userService = new Service(db);

export default {
  port: 3000,
  async fetch(request: Request) {
    const { method, url } = request;
    const { pathname, searchParams } = new URL(url);

    if (method === "GET" && pathname === "/message") {
      const users = userService.getMessages();

      return new Response(JSON.stringify(users));
    }

    if (method === "GET" && pathname === "/message") {
      const user = userService.getMessage(searchParams.get("id"));

      return new Response(JSON.stringify(user));
    }

    if (method === "POST" && pathname === "/message") {
      const data: Message = await request.json();

      userService.createMessage(data);

      return new Response(null, { status: 204 });
    }

    if (method === "PUT" && pathname === "/message") {
      const data: Message = await request.json();

      userService.updateMessage(data);

      return new Response(null, { status: 204 });
    }

    if (method === "DELETE" && pathname === "/message") {
      userService.deleteMessage(searchParams.get("id"));

      return new Response(null, { status: 204 });
    }

    return new Response("Not Found", { status: 404 });
  },
};


//Sends everyday at 1:59
 Cron('59 1 * * *', () => {
  const messageToSMS = userService.messagesTosend();
   messageToSMS.forEach(message => {
     //Issue using Twilio with bun
    // send(message.content, message.number)
   })
});



import messageDatabase , { Message } from "./message.database.js";

export default class Service {
  db: messageDatabase;

  constructor(db: messageDatabase) {
    this.db = db;
  }

  getMessages() {
    return this.db.getMessages();
  }

  getMessage(id: string | null) {
    return this.db.getMessage(id);
  }

  createMessage(message: Message) {
    this.db.createMessage(message);
  }

  updateMessage(message: Message) {
    this.db.updateMessage(message);
  }

  deleteMessage(id: string | null) {
    this.db.deleteUser(id);
  }
  messagesTosend() {
    return this.db.messagesTosend();
  }
}
import { Database } from "bun:sqlite";



export interface Message {
  id?: string,
  number: string,
  send_date: string,
  content: string
}

export default class messageDatabase {
  db: Database;

  constructor() {
    this.db = new Database("messages.sqlite");

    this.db.run(
      `CREATE TABLE IF NOT EXISTS message (id INTEGER PRIMARY KEY AUTOINCREMENT, number TEXT, send_date TEXT, content TEXT);`
    );
  }

  getMessages(): Message[] {
    return this.db.query("SELECT * FROM message").all();
  }

  getMessage(id: string | null): Message {
    return this.db.query("SELECT * FROM message WHERE id = $id").get({
      $id: id,
    });
  }

  createMessage(message: Message) {
    this.db.run("INSERT INTO message (number, send_date, content) VALUES (?,?,?)", [message.number, message.send_date, message.content]);
  }

  updateMessage(message: Message) {
    this.db.run("UPDATE message SET number = ?, send_date = ? , content = ? WHERE id = ?", [message.number, message.send_date, message.content, message.id]);
  }

  deleteUser(id: string |null) {
    this.db.run("DELETE FROM message WHERE id = ?", id);
  }

  messagesTosend(): Message[] {
    const date = new Date().toLocaleDateString()
    return this.db.query("SELECT * FROM message WHERE send_date = $today").all({$today:date});
  }
}
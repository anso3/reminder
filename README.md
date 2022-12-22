SMS Reminder

This app uses /message as a CRUD endpoint for Messages
Messages {
    id? 
    number
    send_date
    content 
}

The app runs a cron everyday at 1:59 that sends the content of any Message that shas a send_date that is equal to the current date. It send the message to the number stored. 
The messages are stored in a SQLite database. 

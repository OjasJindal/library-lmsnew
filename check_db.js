const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./library.db');

db.serialize(() => {
    db.all("SELECT * FROM transactions", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Transactions count:', rows.length);
            console.log(JSON.stringify(rows, null, 2));
        }
    });
});

db.close();

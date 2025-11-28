const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./library.db');

const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', floor: 1, shelf: 'A3' },
    { title: '1984', author: 'George Orwell', floor: 1, shelf: 'B2' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', floor: 2, shelf: 'C1' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', floor: 2, shelf: 'A4' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', floor: 1, shelf: 'B4' }
];

db.serialize(() => {
    const stmt = db.prepare('INSERT INTO books (title, author, location_floor, location_shelf, status) VALUES (?, ?, ?, ?, ?)');

    books.forEach(book => {
        stmt.run(book.title, book.author, book.floor, book.shelf, 'available');
        console.log(`Added: ${book.title} by ${book.author}`);
    });

    stmt.finalize();

    console.log('\n✓ Successfully added 5 new books!');
});

db.close();

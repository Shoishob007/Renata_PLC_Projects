import Database from 'better-sqlite3';

const db = new Database('data.db');

// roles table
db.exec(`
  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);

// users table with role_id fk
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    image_url TEXT,
    role_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );
`);

// default roles if not present
const defaultRoles = ['admin', 'sales', 'user'];
defaultRoles.forEach((role) => {
  db.prepare(`INSERT OR IGNORE INTO roles (name) VALUES (?)`).run(role);
});

export default db;
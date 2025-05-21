import Database from 'better-sqlite3';

const db = new Database('data.db');

// roles table
db.exec(`
  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);

// users with role_id FK
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

// default roles
const defaultRoles = ['admin', 'sales', 'user'];
defaultRoles.forEach((role) => {
  db.prepare(`INSERT OR IGNORE INTO roles (name) VALUES (?)`).run(role);
});

//customer table
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name VARCHAR(50),
    division TEXT,
    gender TEXT,
    marital_status TEXT,
    age INTEGER,
    income INTEGER
  );
`);

export default db;
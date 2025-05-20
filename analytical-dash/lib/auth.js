import db from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export function getRoles() {
  return db.prepare(`SELECT * FROM roles`).all();
}

//register user
export async function registerUser({ email, name, password, image_url, role_id }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = db.prepare(`
      INSERT INTO users (email, name, password, image_url, role_id)
      VALUES (?, ?, ?, ?, ?)
    `).run(email, name, hashedPassword, image_url || null, role_id);

    const role = db.prepare(`SELECT name FROM roles WHERE id = ?`).get(role_id);


    return { id: result.lastInsertRowid, email, name, role_id, role: role?.name, image_url };
  } catch (error) {
    throw new Error(error.message);
  }
}


//login user
export async function loginUser(email, password) {
  const user = db.prepare(`
    SELECT users.*, roles.name as role_name
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.email = ?
  `).get(email);

  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role_id: user.role_id,
    role: user.role_name,
    image_url: user.image_url,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) return null;
  return JSON.parse(userCookie.value);
}

//logout user
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('user');
}
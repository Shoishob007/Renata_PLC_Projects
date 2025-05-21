import db from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  let users;
  if (role) {
    users = db.prepare(`
      SELECT 
        users.id, users.name, users.email, users.image_url, users.created_at, 
        roles.name as role
      FROM users
      LEFT JOIN roles ON users.role_id = roles.id
      WHERE roles.name = ?
      ORDER BY users.id ASC
    `).all(role);
  } else {
    users = db.prepare(`
      SELECT 
        users.id, users.name, users.email, users.image_url, users.created_at, 
        roles.name as role
      FROM users
      LEFT JOIN roles ON users.role_id = roles.id
      ORDER BY users.id ASC
    `).all();
  }
  return Response.json(users);
}

export async function DELETE(request) {
  const { id } = await request.json();
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  return Response.json({ success: true });
}

//updating roles
export async function PUT(request) {
  const { id, role } = await request.json();

  const roleRow = db.prepare(`SELECT id FROM roles WHERE name = ?`).get(role);
  if (!roleRow) {
    return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
  }

  db.prepare('UPDATE users SET role_id = ? WHERE id = ?').run(roleRow.id, id);

  return Response.json({ success: true });
}
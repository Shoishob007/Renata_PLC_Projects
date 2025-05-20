import db from '@/lib/db';

export async function GET() {
  const customers = db.prepare('SELECT * FROM customers').all();
  return Response.json(customers);
}

export async function POST(request) {
  const { name, division, gender, marital_status, age, income } = await request.json();
  // unique ID
  function generateId() {
    const letters = Array(2)
      .fill()
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('');
    const digits = Array(5)
      .fill()
      .map(() => Math.floor(Math.random() * 10))
      .join('');
    return letters + digits;
  }
  let id;
  do {
    id = generateId();
  } while (db.prepare('SELECT 1 FROM customers WHERE id = ?').get(id));

  db.prepare(`
    INSERT INTO customers (id, name, division, gender, marital_status, age, income)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, division, gender, marital_status, age, income);

  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
  return Response.json(customer);
}

export async function PUT(request) {
  const { id, name, division, gender, marital_status, age, income } = await request.json();
  db.prepare(`
    UPDATE customers
    SET name=?, division=?, gender=?, marital_status=?, age=?, income=?
    WHERE id=?
  `).run(name, division, gender, marital_status, age, income, id);
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
  return Response.json(customer);
}

export async function DELETE(request) {
  const { id } = await request.json();
  db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  return Response.json({ success: true });
}
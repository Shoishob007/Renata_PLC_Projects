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

// customer data
const customers = [
  ['BU79786','Andrew','Dhaka','F','Married',26,56274],
  ['QZ44356','Anne','Rajshahi','F','Single',45,0],
  ['AI49188','Anthony','Khulna','F','Married',48,48767],
  ['WW63253','Barbara','Barishal','M','Married',47,0],
  ['HB64268','Brian','Mymensingh','M','Single',26,43836],
  ['OC83172','Bruce','Sylhet','F','Married',28,62902],
  ['XZ87318','Carol','Khulna','F','Married',25,55350],
  ['CF85061','Christine','Barishal','M','Single',29,0],
  ['DY87989','Christopher','Mymensingh','M','Divorced',47,14072],
  ['BQ94931','Craig','Sylhet','F','Married',41,28812],
  ['SX51350','David','Rangpur','M','Single',38,0],
  ['VQ65197','Diane','Chattogram','F','Married',33,0],
  ['DP39365','Elizabeth','Dhaka','M','Married',43,77026],
  ['SJ95423','Grant','Rajshahi','M','Married',35,99845],
  ['IL66569','Gregory','Khulna','M','Single',39,83689],
  ['BW63560','Heather','Barishal','F','Married',43,24599],
  ['FV94802','Helen','Mymensingh','M','Married',44,25049],
  ['OE15005','Ian','Sylhet','M','Married',48,28855],
  ['WC83389','James','Rangpur','M','Married',33,51148],
  ['FL50705','Janet','Chattogram','F','Married',41,66140],
  ['ZK25313','Janice','Dhaka','M','Single',25,57749],
  ['SV62436','Jennifer','Rajshahi','F','Divorced',35,13789],
  ['YH23384','John','Mymensingh','M','Divorced',30,14072],
  ['TZ98966','Judith','Sylhet','F','Single',41,0],
  ['HM55802','Julie','Rangpur','F','Married',48,17870],
  ['FS42516','Karen','Chattogram','M','Married',47,97541],
  ['US89481','Kevin','Dhaka','F','Single',50,0],
  ['HO30839','Linda','Rajshahi','F','Married',30,10511],
  ['GE62437','Lorraine','Khulna','F','Single',46,86584],
  ['EJ77678','Lynette','Rangpur','F','Married',33,75690],
  ['SV85652','Margaret','Chattogram','M','Married',24,23158],
  ['UL64533','Mark','Dhaka','M','Married',28,65999],
  ['PF41800','Mary','Rajshahi','M','Married',35,0],
  ['AO98601','Michael','Khulna','M','Married',34,54500],
  ['SK67821','Pamela','Barishal','F','Married',31,37260],
  ['YV55495','Patricia','Mymensingh','F','Married',39,68987],
  ['KY38074','Paul','Sylhet','M','Married',38,42305],
  ['DM79012','Peter','Rangpur','F','Married',43,65706],
  ['CM61827','Philip','Chattogram','M','Single',34,0],
  ['WC35801','Richard','Khulna','M','Divorced',45,53243],
  ['QG25316','Robert','Rangpur','F','Married',39,0],
  ['MB98372','Robyn','Chattogram','F','Single',41,50071],
  ['IL19217','Sandra','Dhaka','F','Married',28,60021],
  ['SR38658','Stephen','Rajshahi','M','Married',26,43244],
  ['DH41343','Steven','Mymensingh','M','Married',50,92834],
  ['HG65722','Susan','Sylhet','F','Married',46,10105],
  ['BU27331','Suzanne','Rangpur','M','Single',29,0],
  ['XM45289','Wayne','Chattogram','F','Single',28,23218],
  ['KP34198','Wendy','Khulna','F','Married',34,0],
  ['WE95729','William','Sylhet','F','Married',33,0]
];

// bulk insert
const insertCustomer = db.prepare(`
  INSERT OR IGNORE INTO customers
  (id, name, division, gender, marital_status, age, income)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);
const insertMany = db.transaction((customers) => {
  for (const customer of customers) insertCustomer.run(customer);
});
insertMany(customers);

export default db;
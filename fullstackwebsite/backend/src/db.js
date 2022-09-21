
const {Pool} = require('pg');


const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getAllUsers = async () => {
  const select = 'SELECT userdata FROM users;';
  const toRet = [];
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);

  for (const row of rows) {
    const fulluser = {'name': row.userdata.name,
      'password': row.userdata.password, 'email': row.userdata.email};
    toRet.push(fulluser);
  }

  return toRet;
};

exports.getMailBoxes = async () => {
  const select = 'SELECT DISTINCT mailbox FROM mail;';
  const toRet = [];
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  const emails = [];

  for (const row of rows) {
    const fullEmail = {'box': row.mailbox, 'email': row.mail};
    emails.push(fullEmail);
  }
  for (let i = 0; i < emails.length; i ++) {
    toRet[i] = emails[i].box;
  }
  return toRet;
};


exports.getEmailsByBox = async (mailboxname) => {
  const select = 'SELECT mailbox,mail,id FROM mail;';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  const emails = [];

  for (const row of rows) {
    // how to access id or do i need to create a function to insert ID
    if (row.mailbox === mailboxname) {
      // row.mail.id = uuidv4(); i know this isnt how you insert in sql but '
      row.mail.id = row.id;
      emails.push(row.mail);
    }
  }

  return emails;
};

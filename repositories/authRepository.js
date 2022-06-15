import db from "../config/db.js"

async function getByEmail(email) {
  return db.query(`
  SELECT * 
  FROM users 
  WHERE email=$1
  `, [email]);
}

async function createSession(token,id){
  return db.query(`
  INSERT INTO sessions (token, "userId") 
  VALUES ($1, $2)
  `, [token, id]);
}

async function createUser(name,email,password,image){
  return db.query(`
  INSERT INTO users (name,email,password,image)
  VALUES ($1,$2,$3,$4)
  `,[name,email,password,image]);
}

export const urlsRepository = {
  getByEmail,
  createSession,
  createUser
}
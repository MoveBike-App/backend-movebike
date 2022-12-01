import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env

function sign (payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10d' })
}

function verify (token) {
  console.log('JWT', JWT_SECRET);
  return jwt.verify(token, JWT_SECRET)
}

export default {
  ...jwt,
  sign,
  verify
}

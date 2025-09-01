const { nanoid } = require("nanoid");
const pool = require("../config/database");
const bcrypt = require("bcrypt");

const usersModel = {
  async createNewUser({ username, email, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 8);

    const query = {
      text: "INSERT INTO users (id, username, email, password, fullname) VALUES ($1, $2,$3, $4, $5) RETURNING id",
      values: [id, username, email, hashedPassword, fullname],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  },

  async findUserId(userId) {
    const query = {
      text: "SELECT id, username, email, fullname FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  },

  async verifyNewEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  },
};

module.exports = usersModel;

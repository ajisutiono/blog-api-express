const { nanoid } = require("nanoid");
const pool = require("../config/database");

const collaborationsModel = {
  async create(postId, userId) {
    const id = `collab-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO collaborations(id, post_id, user_id) VALUES($1, $2, $3) RETURNING id",
      values: [id, postId, userId],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  },

  async delete(postId, userId) {
    const query = {
      text: "DELETE FROM collaborations WHERE post_id = $1 AND user_id = $2 RETURNING id",
      values: [postId, userId],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  },

  async verify(postId, userId) {
    const query = {
      text: "SELECT * FROM collaborations WHERE post_id = $1 AND user_id = $2",
      values: [postId, userId],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  },
};

module.exports = collaborationsModel;

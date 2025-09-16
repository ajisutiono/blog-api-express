const { nanoid } = require("nanoid");
const pool = require("../config/database");

const postsModel = {
  async create({ title, tags, body, author }) {
    const id = `post-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: "INSERT INTO posts (id, title, body, tags, created_at, updated_at, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, title, body, tags, created_at, updated_at, author],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  },

  async findAll(author) {
    const query = {
      text: "SELECT p.* FROM posts p LEFT JOIN collaborations c ON c.post_id = p.id WHERE p.author = $1 OR c.user_id = $1 GROUP BY p.id",
      values: [author],
    };
    const result = await pool.query(query);

    return result.rows;
  },

  async findById(id) {
    const query = {
      text: "SELECT posts.*, users.username FROM posts LEFT JOIN users ON users.id = posts.author WHERE posts.id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async update(id, { title, tags, body }) {
    const updated_at = new Date().toDateString();
    const query = {
      text: "UPDATE posts SET title=$1, tags=$2, body=$3, updated_at=$4 WHERE id=$5 RETURNING id",
      values: [title, tags, body, updated_at, id],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  },

  async destroy(id) {
    const query = {
      text: "DELETE FROM posts WHERE id=$1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  },

  async verifyPostAuthor(id) {
    const query = {
      text: "SELECT * FROM posts WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },
};

module.exports = postsModel;

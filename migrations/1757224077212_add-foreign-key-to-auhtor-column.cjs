exports.shorthands = undefined;

exports.up = (pgm) => {
  // create new user to using fill out null value
  pgm.sql(
    "INSERT INTO users (id, username, email, password, fullname) VALUES ('old_post', 'old_post', 'old_post@mail.com', 'old_post', 'old post')"
  );

  // fill out null author column on posts table with user old_post
  pgm.sql("UPDATE posts SET author = 'old_post' WHERE author IS NULL");

  // add foreign key to author column in posts table
  pgm.addConstraint(
    "posts",
    "fk_posts.author_users.id",
    "FOREIGN KEY(author) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // drop constraint
  pgm.dropConstraint('posts', 'fk_posts.auhtor_users.id');

  // set null to author old_post
  pgm.sql("UPDATE posts SET author = NULL WHERE author = 'old_post'");

  // delete user old_post
  pgm.sql("DELETE FROM users WHERE id = 'old_post'");
};

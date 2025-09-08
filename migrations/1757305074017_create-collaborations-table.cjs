exports.shorthands = undefined;

exports.up = (pgm) => {
  // make table collaborations
  pgm.createTable("collaborations", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    post_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  // setup unique contraint for post_id and user_id
  pgm.addConstraint(
    "collaborations",
    "unique_post_id_and_user_id",
    "UNIQUE(post_id, user_id)"
  );

  /* setup foregin key for post_id and user_id on collaborations table 
   references post.id and user.id on posts and users table
  */
  pgm.addConstraint(
    "collaborations",
    "fk_collaborations.post_id_post.id",
    "FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE"
  );
  pgm.addConstraint(
    "collaborations",
    "fk_collaborations.user_id_post.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("collaborations");
};

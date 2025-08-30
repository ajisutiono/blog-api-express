exports.up = (pgm) => {
  pgm.createTable("posts", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    body: {
      type: "TEXT",
      notNull: true,
    },
    tags: {
      type: "TEXT[]",
      notNull: true,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("posts");
};

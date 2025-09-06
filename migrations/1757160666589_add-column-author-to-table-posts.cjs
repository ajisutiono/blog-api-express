exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("posts", {
    author: {
      type: "VARCHAR(50)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("posts", "author");
};
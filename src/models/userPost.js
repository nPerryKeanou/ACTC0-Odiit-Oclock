// const { DataTypes } = require("sequelize");
// const { sequelize } = require("./index");
// const User = require("./user");
import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import User from "./user.js";

const UserPost = sequelize.define("UserPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "user_posts",
});

// Relation : un utilisateur peut avoir plusieurs posts
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

export default UserPost;
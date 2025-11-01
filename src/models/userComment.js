import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import User from "./user.js";
import UserPost from "./userPost.js";


const UserComment = sequelize.define("UserCommentary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },//l'id du poste auquel le commentaire est rattaché. 
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "user_commentaries",
});

// Relations
User.hasMany(UserComment, { foreignKey: "userId", onDelete: "CASCADE" });
UserComment.belongsTo(User, { foreignKey: "userId" });

UserPost.hasMany(UserComment, { foreignKey: "postId", onDelete: "CASCADE" });
UserComment.belongsTo(UserPost, { foreignKey: "postId" });

export default UserComment;
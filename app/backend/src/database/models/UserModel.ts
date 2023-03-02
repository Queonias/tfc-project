import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare readonly id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
    unique: true,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'users',
});

export default User;

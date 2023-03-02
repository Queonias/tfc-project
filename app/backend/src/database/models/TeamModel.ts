import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare readonly id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'teams',
});

export default Teams;

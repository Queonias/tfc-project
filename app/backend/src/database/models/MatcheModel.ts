import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class matche extends Model {
  declare readonly id: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeamId: number;
  declare awayTeamId: number;
}

matche.init({
  id: {
    type: INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: true,
    field: 'home_Team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_Team_Goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: true,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'matches',
});

export default matche;

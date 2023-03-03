import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matche extends Model {
  declare readonly id: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeamId: number;
  declare awayTeamId: number;
}

Matche.init({
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

Matche.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'away_team_id' });
Matche.belongsTo(Teams, { foreignKey: 'home_Team_id', as: 'home_Team_id' });
Teams.hasMany(Matche, { foreignKey: 'away_team_id', as: 'id_post' });
Teams.hasMany(Matche, { foreignKey: 'home_Team_id', as: 'home_Team_id' });

export default Matche;

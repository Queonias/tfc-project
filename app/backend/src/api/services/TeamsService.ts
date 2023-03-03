import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Teams> = Teams;

  getAll(): Promise<Teams[]> {
    return this.model.findAll();
  }
}

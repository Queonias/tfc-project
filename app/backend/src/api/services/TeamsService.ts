import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Teams> = Teams;

  getAll(): Promise<Teams[]> {
    return this.model.findAll();
  }

  getById(id: number): Promise<Teams | null> {
    return this.model.findByPk(id);
  }
}

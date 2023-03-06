import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<MatcheModel> = MatcheModel;
  protected ts: ModelStatic<Teams> = Teams;

  getAll(): Promise<MatcheModel[]> {
    return this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }
}

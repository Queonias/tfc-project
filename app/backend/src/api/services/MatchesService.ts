import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import IServiceMatches from '../interfaces/IServiceMatches';
import IMatchesDate from '../interfaces/IMatchesDate';
import IMatches, { IResponseMatches } from '../interfaces/IMatches';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<MatcheModel> = MatcheModel;
  protected ts: ModelStatic<Teams> = Teams;

  getAll(query: string): Promise<MatcheModel[]> {
    const valor = query ? JSON.parse(query) : false;
    return this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: query ? { inProgress: valor } : {},
    });
  }

  async finish(id: number): Promise<[number]> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }

  async update(id: number, data: IMatchesDate): Promise<void> {
    await this.model.update({ ...data }, { where: { id } });
  }

  async create(body: IMatches): Promise<IResponseMatches> {
    const { awayTeamId, homeTeamId } = body;
    if (awayTeamId === homeTeamId) {
      return { type: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const result = await this.model.create({ ...body });
    return { type: 201, message: result };
  }
}

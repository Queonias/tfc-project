import { Request, Response } from 'express';
import IMatchesDate from '../interfaces/IMatchesDate';
import IServiceMatches from '../interfaces/IServiceMatches';
import IMatches from '../interfaces/IMatches';

class MatchesController {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    let { inProgress } = req.query;
    inProgress = inProgress || '';
    const result = await this._service.getAll(inProgress as string);
    return res.status(200).json(result);
  }

  async finished(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this._service.finish(id as number);
    if (result[0]) {
      return res.status(200).json({ message: 'Finished' });
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service
      .update(id as number, { homeTeamGoals, awayTeamGoals } as IMatchesDate);

    return res.status(200).json({ message: 'ok' });
  }

  async create(req: Request, res: Response) {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;
    const result = await this._service
      .create({
        homeTeamGoals,
        awayTeamGoals,
        awayTeamId,
        homeTeamId,
        inProgress: true,

      } as IMatches);

    return res.status(201).json(result);
  }
}

export default MatchesController;

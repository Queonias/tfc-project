import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceLeaderboard';

class LeaderboardController {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  async getAllAway(_req: Request, res: Response) {
    const result = await this._service.findAllAway();
    return res.status(200).json(result);
  }
}

export default LeaderboardController;

import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

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
}

export default MatchesController;

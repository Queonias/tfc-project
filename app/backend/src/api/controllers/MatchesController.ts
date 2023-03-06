import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';
import IToken from '../interfaces/IToken';

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
}

export default MatchesController;

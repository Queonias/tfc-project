import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const result = await this._service.getAll();
    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this._service.getById(id);
    return res.status(200).json(result);
  }
}

export default TeamController;

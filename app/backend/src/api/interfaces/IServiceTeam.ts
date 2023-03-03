import Teams from '../../database/models/TeamModel';

export default interface IServiceTeam {
  getAll(): Promise<Teams[]>;
  getById(id: number): Promise<Teams | null>;
}

import Matche from '../../database/models/MatcheModel';

export default interface IServiceMatche {
  getAll(query: string): Promise<Matche[]>;
  finish(id: number): Promise<[number]>;
}

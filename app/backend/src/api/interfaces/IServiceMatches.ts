import Matche from '../../database/models/MatcheModel';
import IMatchesDate from './IMatchesDate';

export default interface IServiceMatche {
  getAll(query: string): Promise<Matche[]>;
  finish(id: number): Promise<[number]>;
  update(id: number, date: IMatchesDate): Promise<void>;
}

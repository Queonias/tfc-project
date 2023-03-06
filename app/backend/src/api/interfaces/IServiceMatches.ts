import Matche from '../../database/models/MatcheModel';
import IMatchesDate from './IMatchesDate';
import IMatches, { IResponseMatches } from './IMatches';

export default interface IServiceMatche {
  getAll(query: string): Promise<Matche[]>;
  finish(id: number): Promise<[number]>;
  update(id: number, date: IMatchesDate): Promise<void>;
  create(date: IMatches): Promise<IResponseMatches>;
}

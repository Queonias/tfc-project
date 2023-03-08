import Matche from './ILeaderboard';
// import Matches from '../../database/models/MatcheModel';

export default interface IServiceLeaderboard {
  findAll(): Promise<Matche[]>;
  // calcPoints(id: number, listMatches: Matches[]): number;
}

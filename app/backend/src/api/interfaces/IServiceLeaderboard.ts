import Matche, { ILeaderboardAway } from './ILeaderboard';
// import Matches from '../../database/models/MatcheModel';

export default interface IServiceLeaderboard {
  findAll(): Promise<Matche[]>;
  findAllAway(): Promise<ILeaderboardAway[]>;
}

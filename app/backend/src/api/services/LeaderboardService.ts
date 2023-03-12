import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Matches from '../../database/models/MatcheModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import { calcLeaderboard, calcLeaderboardAway } from '../../utils/modelCalcUtil';

export function sortLeaderboard(leaderboard: ILeaderboard[]) {
  const sortILeaderboard = leaderboard
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return sortILeaderboard;
}

export default class UserService implements IServiceLeaderboard {
  protected teamModel: ModelStatic<Team> = Team;
  protected matchesModel: ModelStatic<Matches> = Matches;

  async findAll() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();
    return sortLeaderboard(calcLeaderboard(teams, matches));
  }

  async findAllAway() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();
    return sortLeaderboard(calcLeaderboardAway(teams, matches));
  }
}

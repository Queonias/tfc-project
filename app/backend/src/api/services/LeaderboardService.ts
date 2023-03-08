import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Matches from '../../database/models/MatcheModel';
import ILeaderboard from '../interfaces/ILeaderboard';

function calcPoints(id: number, listMatches: Matches[]) {
  const totalPoints = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, homeTeamGoals, awayTeamGoals, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      if (homeTeamGoals > awayTeamGoals) {
        const points = acc + 3;
        return points;
      } if (homeTeamGoals === awayTeamGoals) {
        const points = acc + 1;
        return points;
      }
    }
    return acc;
  }, 0);
  return totalPoints;
}

function calcGames(id: number, listMatches: Matches[]) {
  const totalGames = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalGames;
}

function calcVictories(id: number, listMatches: Matches[]) {
  const totalVictories = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, awayTeamGoals, homeTeamGoals, inProgress } = games.dataValues;
    if (homeTeamGoals > awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalVictories;
}

function calcDraws(id: number, listMatches: Matches[]) {
  const totalDraws = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, awayTeamGoals, homeTeamGoals, inProgress } = games.dataValues;
    if (homeTeamGoals === awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalDraws;
}

function calcLosses(id: number, listMatches: Matches[]) {
  const totalLosses = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, awayTeamGoals, homeTeamGoals, inProgress } = games.dataValues;
    if (homeTeamGoals < awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalLosses;
}

function calcGoalsFavor(id: number, listMatches: Matches[]) {
  const goalsFavor = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, homeTeamGoals, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const goals = acc + homeTeamGoals;
      return goals;
    }
    return acc;
  }, 0);
  return goalsFavor;
}

function calcGoalsOwn(id: number, listMatches: Matches[]) {
  const goalsOwn = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, awayTeamGoals, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const goals = acc + awayTeamGoals;
      return goals;
    }
    return acc;
  }, 0);
  return goalsOwn;
}

function calcGoalsBalance(id: number, listMatches: Matches[]) {
  const goalsBalance = calcGoalsFavor(id, listMatches) - calcGoalsOwn(id, listMatches);
  return goalsBalance;
}

function calcEfficiency(id: number, listMatches: Matches[]) {
  const efficiency = (calcPoints(id, listMatches) / (calcGames(id, listMatches) * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
}

function calcLeaderboard(team: Team[], matches: Matches[]) {
  const leaderboard = team.reduce((acc: ILeaderboard[], time) => {
    const { id, teamName } = time.dataValues;
    acc.push({
      name: teamName,
      totalPoints: calcPoints(id, matches),
      totalGames: calcGames(id, matches),
      totalVictories: calcVictories(id, matches),
      totalDraws: calcDraws(id, matches),
      totalLosses: calcLosses(id, matches),
      goalsFavor: calcGoalsFavor(id, matches),
      goalsOwn: calcGoalsOwn(id, matches),
      goalsBalance: calcGoalsBalance(id, matches),
      efficiency: calcEfficiency(id, matches),
    });
    return acc;
  }, []);

  return leaderboard;
}

function sortLeaderboard(leaderboard: ILeaderboard[]) {
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
}

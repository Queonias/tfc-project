import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import TeamModel from '../database/models/TeamModel';
import TeamService from '../api/services/TeamsService';

// import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

const outputMock = [{
  id: 1,
  teamName: 'Joaquim'
}]

describe('Teste de Serviço: Get Teams', () => {
  
  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('Caso 1: Deve retornar todos os times corretamente', async () => {
    sinon.stub(Model, "findAll").resolves([{ id: 1, teamName: 'Joaquim' }] as TeamModel[]);

    const service = new TeamService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });

  it('Caso 2: Deve retornar todos os times corretamente', async () => {
    const app = new App();
    const response = await chai.request(app.app).get('/teams');

    expect(response.status).to.be.equal(200);
  })
});

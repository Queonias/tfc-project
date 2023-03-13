<p>Funcionalidades</p>
<p>O objetivo do TFC é ser um site informativo sobre partidas e classificações de futebol. Para adicionar uma partida, é necessário ter um token e a pessoa deve estar logada para fazer as alterações. Há um relacionamento entre as tabelas de times e partidas para fazer as atualizações das partidas.</p>
<p>Instalação</p>
<p>Para executar o projeto, é necessário ter instalado na máquina o Node.js versão 16, Docker e Docker-compose versão 1.29.2 ou superior. Após clonar o repositório, rode o comando npm install nas pastas backend e frontend.</p>
<p>Tecnologias</p>
<ul>
  <li>Node.js</li>
  <li>Docker</li>
  <li>MySQL</li>
  <li>Sequelize</li>
</ul>
<p>Estrutura do projeto</p>
<p>O projeto é composto por um banco de dados, um back-end, um front-end e um arquivo docker-compose.yml.</p>
<p>Banco de dados</p>
<p>O banco de dados é um container docker MySQL já configurado no docker-compose através de um serviço definido como db. Durante a execução dos testes, é sempre acessado pelo sequelize e via porta 3002 do localhost. Também é possível conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver, etc), colocando as credenciais configuradas no docker-compose no serviço db.</p>
<p>Back-end</p>
<p>O back-end é onde é realizado a maior parte das implementações exigidas. Deve rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão. A aplicação deve ser inicializada a partir do arquivo app/backend/src/server.ts. É importante garantir que o express é executado e que a aplicação ouve a porta que vem das variáveis de ambiente. Todas as dependências extras, como joi, boom, express-async-errors, devem ser listadas em app/backend/packages.npm.</p>
<p>Front-end</p>
<p>O front-end já está concluído e não é necessário realizar modificações nele. A única exceção será o Dockerfile que precisará ser configurado. Todos os testes a partir do requisito de login usam o puppeteer para simular uma pessoa acessando o site http://localhost:3000/. O front-end se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints que foram construídos nos requisitos.</p>
<p>Docker</p>
<p>O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up. Para inicializar a aplicação, é necessário configurar corretamente os arquivos Dockerfile nas raízes do front-end e back-end.</p>
<p>Contribuição</p>
<p>Contribuições são bem-vindas! Sinta-se livre para abrir um Pull Request ou Issues para discutir o projeto.</p>
Mensagem recebida. Claro! Aqui está o texto convertido em HTML: ```html <p>Front-end</p> <p>O front-end já está concluído e não é necessário realizar modificações nele. A única exceção será o Dockerfile que precisará ser configurado. Todos os testes a partir do requisito de login usam o puppeteer para simular uma pessoa acessando o site http://localhost:3000/. O front-end se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints que foram construídos nos requisitos.</p> <p>Docker</p> <p>O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up. Para inicializar a aplicação, é necessário configurar corretamente os arquivos Dockerfile nas raízes do front-end e back-end.</p> <p>Contribuição</p> <p>Contribuições são bem-vindas! Sinta-se livre para abrir um Pull Request ou Issues para discutir o projeto.</p> ```

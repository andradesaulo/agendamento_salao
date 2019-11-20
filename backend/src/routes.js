import { Router } from 'express';

import ClienteController from './app/controllers/ClienteController';
import EnderecoController from './app/controllers/EnderecoController';
import HorarioController from './app/controllers/HorarioController';
import ProfissionalController from './app/controllers/ProfissionalController';
import ServicoController from './app/controllers/ServicoController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Cria uma sessão (login)
routes.post('/sessions', SessionController.store);
// Cadastra endereço
routes.post('/endereco', EnderecoController.store);
// Cadastra cliente
routes.post('/cliente', ClienteController.store);

// Verifica se o usuário está logado, para todas as rotas abaixo
routes.use(authMiddleware);

// Atualiza cliente
routes.put('/cliente/:id', ClienteController.update);
// Lista todos clientes
routes.get('/clientes', ClienteController.index);
// Remove cliente
routes.delete('/cliente/:id', ClienteController.delete);

// Cadastra profissional
routes.post('/profissional', ProfissionalController.store);
// Lista todos profissionais
routes.get('/profissionais', ProfissionalController.index);
// Atualiza profissional
routes.put('/profissional/:id', ProfissionalController.update);
// Remove profissional
routes.delete('/profissional/:id', ProfissionalController.delete);

// Cria ou relaciona um serviço a um profissional
routes.post('/profissionais/:id_profissional/servico', ServicoController.store);
// Busca serviços de um profissional
routes.get('/profissionais/:id_profissional/servicos', ServicoController.show);
// Edita um serviço de um profissional
routes.put(
  '/profissionais/:id_profissional/servico/:id_servico',
  ServicoController.update
);
// Remove um serviço de um profissional
routes.delete(
  '/profissionais/:id_profissional/servico/:id_servico',
  ServicoController.delete
);

// Cadastra horários do profissional
routes.post('/profissionais/:id_profissional/horario', HorarioController.store);
// Lista horários do profissional
routes.get('/profissionais/:id_profissional/horarios', HorarioController.show);

// Lista todos serviços
routes.get('/servicos', ServicoController.index);

export default routes;

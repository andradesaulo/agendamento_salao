import { Router } from 'express';

import EnderecoController from './app/controllers/EnderecoController';
import ServicoController from './app/controllers/ServicoController';
import ProfissionalController from './app/controllers/ProfissionalController';

const routes = new Router();

routes.post('/endereco', EnderecoController.store);

routes.get('/profissionais', ProfissionalController.index);
routes.post('/profissional', ProfissionalController.store);
routes.put('/profissional/:id', ProfissionalController.update);
routes.delete('/profissional/:id', ProfissionalController.delete);

routes.get('/servicos', ServicoController.index);

routes.get('/profissionais/:id_profissional/servicos', ServicoController.show);
routes.post('/profissionais/:id_profissional/servico', ServicoController.store);
routes.put(
  '/profissionais/:id_profissional/servico/:id_servico',
  ServicoController.update
);
routes.delete(
  '/profissionais/:id_profissional/servico/:id_servico',
  ServicoController.delete
);

export default routes;

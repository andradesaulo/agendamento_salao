import { Router } from 'express';

import EnderecoController from './app/controllers/EnderecoController';
import ServicoController from './app/controllers/ServicoController';
import ProfissionalController from './app/controllers/ProfissionalController';

const routes = new Router();

routes.get('/servicos', ServicoController.index);
routes.post('/servico', ServicoController.store);
routes.put('/servico/:id', ServicoController.update);
routes.delete('/servico/:id', ServicoController.delete);

routes.get('/profissionais', ProfissionalController.index);
routes.post('/profissional', ProfissionalController.store);
routes.put('/profissional/:id', ProfissionalController.update);
routes.delete('/profissional/:id', ProfissionalController.delete);

routes.post('/endereco', EnderecoController.store);

export default routes;

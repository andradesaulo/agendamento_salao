import { Router } from 'express';

import ServicoController from './app/controllers/ServicoController';

const routes = new Router();

routes.get('/servicos', ServicoController.index);
routes.post('/servico', ServicoController.store);
routes.put('/servico/:id_servico', ServicoController.update);
routes.delete('/servico/:id_servico', ServicoController.delete);

export default routes;

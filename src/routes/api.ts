import { Router } from 'express';

import { privateRouter } from '../config/passport';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping);

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', privateRouter, ApiController.list);

export default router;
import { Router } from 'express';
import { requestData } from '../controller/getSimpleData.controller';

const router = Router();

router.route('/request-data')
    .get(requestData);



export default router;

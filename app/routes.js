import { Router } from 'express';
import { login } from './controllers/login';
import { animals } from './controllers/animals';
const router = Router();

//TODO: Add route configs here.
router.get('/', function (req, res) {
  res.send('hello world')
})
router.post('/login', function (req, res) {
  login(req, res);
})
router.get('/api/animals', function (req, res) {
  animals(req, res);
})

export default router;

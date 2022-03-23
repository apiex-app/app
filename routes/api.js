import app from '../config/app.js';
import { Router as router } from 'express';
import bodyParser from 'body-parser';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



export default router;

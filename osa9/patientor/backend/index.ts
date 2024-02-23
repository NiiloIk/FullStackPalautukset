import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors';

import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patient';

app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
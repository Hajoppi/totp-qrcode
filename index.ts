import express, {Request, Response} from 'express';
import cors from 'cors';
import totp from "./totp";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const TIME_STEP = 20;

const generateKey = (eventId: string) => {
  return totp(eventId, { timeStep: TIME_STEP });
}

const validateKey = (eventId: string, hash: string) => {
  const hashNow = totp(eventId, { timeStep: TIME_STEP });
  const hashOld = totp(eventId, { timeStep: TIME_STEP, timeOffset: TIME_STEP });
  const valid = hash === hashNow || hash === hashOld;
  return valid;
}

app.get('/generate/:eventId', (request: Request, response: Response)=> {
  const { eventId } = request.params;
  const key = generateKey(eventId);
  return response.send({ hash: `${eventId}-${key}` })
});

app.get('/validate/:hash', (request: Request, response: Response)=> {
  const { hash } = request.params
  const [eventId, key] = hash.split('-');
  const keyIsValid = validateKey(eventId, key);
  return response.send({valid: keyIsValid});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server in running in localhost:${PORT}`);
})
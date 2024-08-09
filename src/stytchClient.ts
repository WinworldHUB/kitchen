import { Client } from 'stytch';
import { STYTCH_SECRET_KEY, STYTCH_PROJECT_ID } from './lib/constants';

const clientConfig = {
  project_id: STYTCH_PROJECT_ID.MINOR+STYTCH_PROJECT_ID.MODE+STYTCH_PROJECT_ID.MAJOR,
  secret: STYTCH_SECRET_KEY.MINOR+STYTCH_SECRET_KEY.MODE+STYTCH_SECRET_KEY.MAJOR,
};

const client = new Client(clientConfig);

export default client;
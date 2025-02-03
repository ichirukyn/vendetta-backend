import { ErisEnvLoader } from 'eris-env';

const envLoader = new ErisEnvLoader({});

export const config = {
  database: {
    host: envLoader.getEnv('string', 'DB', 'HOST'),
    port: envLoader.getEnv('number', 'DB', 'PORT'),
    user: envLoader.getEnv('string', 'DB', 'USER'),
    pass: envLoader.getEnv('string', 'DB', 'PASS'),
    name: envLoader.getEnv('string', 'DB', 'NAME'),
  },
};

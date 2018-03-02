interface IConfig {
  MONGO_DATABASE_NAME: string
  MONGO_URL: string
  HASH_KEY: string
  SECRET: string
  JWT_OPTIONS: object
  [key: string]: string | object
}

export const config: IConfig = {
  'MONGO_DATABASE_NAME': 'lento_dev',
  'MONGO_URL': 'mongodb://localhost:27017',
  'HASH_KEY': '13refds7ujwedf',
  'SECRET': 'SeCrEtKeYfOrHaShIn',
  'JWT_OPTIONS': {
    'expiresIn': '7d',
    'issuer': 'lento.in',
    'subject': 'userInfo'
  }
}

export default config

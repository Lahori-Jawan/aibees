import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  console.log('Error while loading .env file @ ormconfig.ts');
  /* do nothing */
}

export const isProd = process.env.NODE_ENV === 'production';
console.log('\nenvironment', process.env.NODE_ENV, { isProd });

export const OrmConfig = {
  type: 'postgres' as 'postgres',
  url: process.env.DB_URL,
  entities: [
    isProd
      ? 'dist/**/**.entity{.ts,.js}'
      : __dirname + './../../**/**.entity{.ts,.js}', //* path relative to ormConfig.ts
  ],
  synchronize: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

// module.exports = ORMConfig;

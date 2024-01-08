// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//
// class ConfigService {
//   public getTypeOrmConfig(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//
//       host: this.get('POSTGRES_HOST'),
//       port: this.get<number>('POSTGRES_PORT'),
//       username: this.get('POSTGRES_USER'),
//       password: this.get('POSTGRES_PASSWORD'),
//       database: this.get('POSTGRES_DATABASE'),
//
//       entities: ['**/*.entity{.ts,.js}'],
//
//       migrationsTableName: 'migration',
//
//       migrations: ['src/migration/*.ts'],
//
//       // cli: {
//       //   migrationsDir: 'src/migration',
//       // },
//
//       // ssl: this.isProduction(),
//     };
//   }
// }
//
// export { ConfigService };

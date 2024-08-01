import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv'
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.env.development'})

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true, // cuando arme los archivos de migracion se van a correr de manera automatico ( en prod, hay que tenerlo desactivado )
    logging: true,
    dropSchema:false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
  }
export default registerAs('typeorm', () => config) // legible para type config module

export const connectionSource = new DataSource(config as DataSourceOptions) // para las migraciones
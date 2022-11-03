import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PgService implements OnModuleInit  {

    pgp = require('pg-promise')();

    connConfig = {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    }

    pg = this.pgp(this.connConfig);

    onModuleInit() {
        console.log(this.pg)
        // throw new Error('Method not implemented.');
      }

    getUser(param: string[]): Promise<any> {
        var qry = `SELECT 'a' as col1, 'b' as col2 where $1 = $2`;
    
        return this.pg.any(qry, param) as Promise<any>;
      }
}

import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {

  public readonly isDev: boolean = (process.argv[2] != null);

  onModuleInit() {
    console.log("Dev: " + this.isDev)
    // throw new Error('Method not implemented.');
  }

  getEnv(): string {
    var envString =
      'App port: ' + process.env.PORT
      + ' pg host: ' + process.env.POSTGRES_HOST
      + " pg port: " + process.env.POSTGRES_PORT
      + ' pg db: ' + process.env.POSTGRES_DB
      + " pg user: " + process.env.POSTGRES_USER;

    return envString;
  }

  
}

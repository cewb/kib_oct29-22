import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World port: ' + process.env.PORT + " pg port: "
      + process.env.POSTGRES_PORT;
  }
}

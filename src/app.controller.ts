import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PgService } from './providers/pg/pg.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly pgService: PgService) {}

  @Get()
  async getHello(): Promise<string> {
    //return this.appService.getEnv();
    return await this.pgService.getUser(['1', '1']);
  }
}

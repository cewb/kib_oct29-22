import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PgService } from './providers/pg/pg.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly pgService: PgService) { }


  @Get("ping")
  async getUser(): Promise<string> {
    //return this.appService.getEnv();
    return await this.pgService.getUser(['1', '1']);
  }

  @Post("push")
  async postPhUsers(@Body() users: JSON[]) {
    //console.log(users);
    return await this.pgService.pushPhUsers(users);
  }

}

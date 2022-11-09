import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PgService } from './providers/pg/pg.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly pgService: PgService) { }


  @Get("ping")
  async getPing(): Promise<string> {
    //return this.appService.getEnv();
    return await this.pgService.getPing(['1', '1']);
  }

  @Post("push")
  async postPhUsers(@Body() users: JSON[]) {
    //console.log(users);
    users.forEach((user) => {
      this.pgService.pushPhUser(user);
    })
  }

  @Get("users")
  async getUsers(): Promise<JSON[]> {
    return await this.pgService.getDbUsers();
  }

  @Get("user/:id")
  async getUser(@Param() params): Promise<JSON[]> {
    return await this.pgService.getDbUser(params.id);
  }

  @Get("users_delete_all")
  async deleteAllUsers(): Promise<any> {
    return await this.pgService.deleteAllTables();
  }
}

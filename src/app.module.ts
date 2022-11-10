import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PgService } from './providers/pg/pg.service';


var dbSuffix = ""
if (process.argv[2]) dbSuffix = "-dev"

console.log('database' + dbSuffix + '.env');

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', 'database' + dbSuffix + '.env'],
  })],
  controllers: [AppController],
  providers: [AppService, PgService],
})
export class AppModule { }

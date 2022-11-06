import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  const config = new DocumentBuilder()
    .setTitle('KIB Challenge Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('KIB Challenge')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  /* */

  await app.listen(process.env.PORT);
}
bootstrap();

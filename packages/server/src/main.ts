import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'serverSrc/app.module';
import { ValidationPipe } from '@nestjs/common';

import { GlobalVar } from '@mapbul-pub/common';
GlobalVar.setup(`${__dirname}/.env`);
console.log(GlobalVar.env);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  const port = process.env.PORT || 3100;
  app.setBaseViewsDir(`${__dirname}/views`);
  app.setViewEngine('hbs');
  await app.listen(port);
  console.log(`Server started at http://localhost:${port}`);
}
bootstrap();

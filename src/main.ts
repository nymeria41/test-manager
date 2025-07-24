// main.ts
import { ValidationPipe } from '@nestjs/common';
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // supprime les propriétés non définies dans le DTO
  }));

  // Configuration Swagger
  const config = new DocumentBuilder()
      .setTitle('Test Manager API')
      .setDescription('API pour gérer les tests, suites, exécutions, etc.')
      .setVersion('1.0')
      .addBearerAuth() // Si tu utilises JWT Auth, ça ajoute le bouton de login dans Swagger
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();


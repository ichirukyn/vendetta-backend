import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const app = await NestFactory.create(AppModule, {cors: true});
  
  const config = new DocumentBuilder().setTitle('API Vendetta').setDescription('').setVersion('0').addTag('Vendetta').build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  
  await app.listen(3000);
}

start();

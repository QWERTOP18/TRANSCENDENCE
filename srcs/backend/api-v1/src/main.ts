import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Transcendence API')
    .setDescription('The Transcendence API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3001}`);
  });
}
bootstrap();

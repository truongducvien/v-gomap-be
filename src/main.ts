import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_PREFIX } from './constants';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();
  // Endpoint prefix
  app.setGlobalPrefix(API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('V-Gomap')
    .setDescription('API for V-Gomap')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Server is running on PORT `, process.env.PORT);
  });
}
bootstrap();

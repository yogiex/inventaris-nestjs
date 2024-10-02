import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('IFLAB Warehouse')
    .setDescription('The IFLAB Warehouse API description')
    .setVersion('1.0')
    .addTag('Inventory')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();

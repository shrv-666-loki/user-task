import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () => Logger.log(`server is listening on port ${port}`)
  );
}
bootstrap();

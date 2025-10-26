import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';

async function bootstrap(): Promise<void> {
  const port: number = Number(process.env.PORT) || 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(chalk.bgYellow(`🚀 Server running on http://localhost:${port}`));
}
bootstrap().catch((err) => {
  console.log(chalk.bgRed(`Failed to start server:`, err));
});

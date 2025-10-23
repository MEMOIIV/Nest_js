import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port: number = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap().catch((err) => {
  console.log(`❌ Failed to start server:`, err);
});

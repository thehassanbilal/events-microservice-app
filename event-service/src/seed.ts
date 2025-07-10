#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedCLIService } from './common/seeds/seed-cli.service';

async function bootstrap() {
  try {
    console.log('🌱 Starting Event Service Seed Script...');

    // Create the application context
    const app = await NestFactory.createApplicationContext(AppModule);

    // Get the seed CLI service
    const seedCLIService = app.get(SeedCLIService);

    // Parse command line arguments
    const args = process.argv.slice(2);
    const options = seedCLIService.parseCLIArgs(args);

    // Run the seeds
    await seedCLIService.runFromCLI(options);

    console.log('✅ Seed script completed successfully');

    // Close the application
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed script failed:', error.message);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the seed script
bootstrap();

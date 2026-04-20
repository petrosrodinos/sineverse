import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { CreditsService } from '@/modules/credits/credits.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const creditsService = app.get(CreditsService);

    const packs = await creditsService.syncDefaultCreditPacks();

    console.log(`Synced ${packs.length} credit packs`);
  } finally {
    await app.close();
  }
}

run().catch((error) => {
  console.error('Failed to sync credit packs', error);

  process.exit(1);
});

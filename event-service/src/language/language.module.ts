import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { LanguageSeeder } from './language.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './schema/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [LanguageController],
  providers: [LanguageService, LanguageSeeder],
  exports: [LanguageSeeder],
})
export class LanguageModule {}

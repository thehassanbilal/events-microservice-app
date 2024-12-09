import { Module, OnModuleInit } from '@nestjs/common';
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
})
export class LanguageModule implements OnModuleInit {
  constructor(private readonly languageSeeder: LanguageSeeder) {}

  async onModuleInit() {
    await this.languageSeeder.seed();
  }
}

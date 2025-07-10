import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './schema/language.schema';
import { BaseSeeder, SeedResult } from '../common/seeds/base.seeder';

@Injectable()
export class LanguageSeeder extends BaseSeeder {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {
    super();
  }

  async seed(): Promise<SeedResult> {
    try {
      const languages = [
        { name: 'English (US)', countryCode: 'US' },
        { name: 'English (GB)', countryCode: 'GB' },
        { name: 'French', countryCode: 'FR' },
        { name: 'German', countryCode: 'DE' },
        { name: 'Italian', countryCode: 'IT' },
        { name: 'Spanish', countryCode: 'ES' },
        { name: 'Japanese', countryCode: 'JP' },
        { name: 'Chinese', countryCode: 'CN' },
        { name: 'Hindi', countryCode: 'IN' },
        { name: 'Arabic (SA)', countryCode: 'SA' },
        { name: 'Arabic (SYR)', countryCode: 'SYR' },
        { name: 'Dutch', countryCode: 'NL' },
        { name: 'Swedish', countryCode: 'SE' },
        { name: 'Norwegian', countryCode: 'NO' },
        { name: 'Danish', countryCode: 'DK' },
        { name: 'Finnish', countryCode: 'FI' },
        { name: 'Polish', countryCode: 'PL' },
        { name: 'Czech', countryCode: 'CZ' },
        { name: 'Hungarian', countryCode: 'HU' },
        { name: 'Romanian', countryCode: 'RO' },
        { name: 'Urdu', countryCode: 'PK' },
        { name: 'Bengali', countryCode: 'BD' },
        { name: 'Tagalog', countryCode: 'PH' },
        { name: 'Korean', countryCode: 'KR' },
        { name: 'Thai', countryCode: 'TH' },
        { name: 'Vietnamese', countryCode: 'VN' },
        { name: 'Malay', countryCode: 'MY' },
        { name: 'Persian', countryCode: 'IR' },
        { name: 'Greek', countryCode: 'GR' },
        { name: 'Turkish', countryCode: 'TR' },
        { name: 'Ukrainian', countryCode: 'UA' },
        { name: 'Russian', countryCode: 'RU' },
        { name: 'Portuguese', countryCode: 'PT' },
      ];

      let createdCount = 0;
      let skippedCount = 0;

      for (const language of languages) {
        const exists = await this.checkIfExists(
          this.languageModel,
          { countryCode: language.countryCode },
          `Language with country code ${language.countryCode} already exists`,
        );

        if (!exists) {
          await this.createData(this.languageModel, language);
          createdCount++;
        } else {
          skippedCount++;
        }
      }

      return {
        success: true,
        message: `Language seeding completed. Created: ${createdCount}, Skipped: ${skippedCount}`,
        data: { created: createdCount, skipped: skippedCount },
      };
    } catch (error) {
      return {
        success: false,
        message: `Language seeding failed: ${error.message}`,
        error,
      };
    }
  }
}

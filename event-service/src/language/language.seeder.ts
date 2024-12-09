import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './schema/language.schema';

@Injectable()
export class LanguageSeeder {
  private readonly logger = new Logger(LanguageSeeder.name);

  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  async seed() {
    const languages = [
      { name: 'English (US)', countryCode: 'US' }, // United States
      { name: 'English (GB)', countryCode: 'GB' }, // United Kingdom
      { name: 'French', countryCode: 'FR' }, // France
      { name: 'German', countryCode: 'DE' }, // Germany
      { name: 'Italian', countryCode: 'IT' }, // Italy
      { name: 'Spanish', countryCode: 'ES' }, // Spain
      { name: 'Japanese', countryCode: 'JP' }, // Japan
      { name: 'Chinese', countryCode: 'CN' }, // China
      { name: 'Hindi', countryCode: 'IN' }, // India
      { name: 'Arabic (SA)', countryCode: 'SA' }, // Saudi Arabia
      { name: 'Arabic (SYR)', countryCode: 'SYR' }, // Saudi Arabia
      { name: 'Dutch', countryCode: 'NL' }, // Netherlands
      { name: 'Swedish', countryCode: 'SE' }, // Sweden
      { name: 'Norwegian', countryCode: 'NO' }, // Norway
      { name: 'Danish', countryCode: 'DK' }, // Denmark
      { name: 'Finnish', countryCode: 'FI' }, // Finland
      { name: 'Polish', countryCode: 'PL' }, // Poland
      { name: 'Czech', countryCode: 'CZ' }, // Czech Republic
      { name: 'Hungarian', countryCode: 'HU' }, // Hungary
      { name: 'Romanian', countryCode: 'RO' }, // Romania
      { name: 'Urdu', countryCode: 'PK' }, // Pakistan
      { name: 'Bengali', countryCode: 'BD' }, // Bangladesh
      { name: 'Tagalog', countryCode: 'PH' }, // Philippines
      { name: 'Korean', countryCode: 'KR' }, // South Korea
      { name: 'Thai', countryCode: 'TH' }, // Thailand
      { name: 'Vietnamese', countryCode: 'VN' }, // Vietnam
      { name: 'Malay', countryCode: 'MY' }, // Malaysia
      { name: 'Persian', countryCode: 'IR' }, // Iran
      { name: 'Greek', countryCode: 'GR' }, // Greece
      { name: 'Turkish', countryCode: 'TR' }, // Turkey
      { name: 'Ukrainian', countryCode: 'UA' }, // Ukraine
      { name: 'Russian', countryCode: 'RU' }, // Russia
      { name: 'Portuguese', countryCode: 'PT' }, // Portugal
    ];
    // test comment

    for (const language of languages) {
      const existingLanguage = await this.languageModel
        .findOne({ countryCode: language.countryCode })
        .exec();
      if (!existingLanguage) {
        const createdLanguage = new this.languageModel(language);
        await createdLanguage.save();
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SeedConfig {
  enabled: boolean;
  environment: string;
  database: {
    uri: string;
    name: string;
  };
  seeders: {
    languages: {
      enabled: boolean;
      clearExisting: boolean;
    };
    eventCategories: {
      enabled: boolean;
      clearExisting: boolean;
    };
    eventTeams: {
      enabled: boolean;
      clearExisting: boolean;
    };
    events: {
      enabled: boolean;
      clearExisting: boolean;
    };
  };
  logging: {
    level: string;
    verbose: boolean;
  };
  validation: {
    enabled: boolean;
    strict: boolean;
  };
}

@Injectable()
export class SeedConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Get seed configuration
   */
  getSeedConfig(): SeedConfig {
    return {
      enabled: this.configService.get<boolean>('SEED_ENABLED', true),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      database: {
        uri: this.configService.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/events',
        ),
        name: this.configService.get<string>('MONGODB_NAME', 'events'),
      },
      seeders: {
        languages: {
          enabled: this.configService.get<boolean>(
            'SEED_LANGUAGES_ENABLED',
            true,
          ),
          clearExisting: this.configService.get<boolean>(
            'SEED_LANGUAGES_CLEAR',
            false,
          ),
        },
        eventCategories: {
          enabled: this.configService.get<boolean>(
            'SEED_EVENT_CATEGORIES_ENABLED',
            true,
          ),
          clearExisting: this.configService.get<boolean>(
            'SEED_EVENT_CATEGORIES_CLEAR',
            false,
          ),
        },
        eventTeams: {
          enabled: this.configService.get<boolean>(
            'SEED_EVENT_TEAMS_ENABLED',
            true,
          ),
          clearExisting: this.configService.get<boolean>(
            'SEED_EVENT_TEAMS_CLEAR',
            false,
          ),
        },
        events: {
          enabled: this.configService.get<boolean>('SEED_EVENTS_ENABLED', true),
          clearExisting: this.configService.get<boolean>(
            'SEED_EVENTS_CLEAR',
            false,
          ),
        },
      },
      logging: {
        level: this.configService.get<string>('SEED_LOG_LEVEL', 'info'),
        verbose: this.configService.get<boolean>('SEED_VERBOSE', false),
      },
      validation: {
        enabled: this.configService.get<boolean>(
          'SEED_VALIDATION_ENABLED',
          true,
        ),
        strict: this.configService.get<boolean>(
          'SEED_VALIDATION_STRICT',
          false,
        ),
      },
    };
  }

  /**
   * Check if seeding is enabled
   */
  isSeedingEnabled(): boolean {
    return this.getSeedConfig().enabled;
  }

  /**
   * Check if a specific seeder is enabled
   */
  isSeederEnabled(seederName: string): boolean {
    const config = this.getSeedConfig();

    switch (seederName) {
      case 'languages':
        return config.seeders.languages.enabled;
      case 'event-categories':
        return config.seeders.eventCategories.enabled;
      case 'event-teams':
        return config.seeders.eventTeams.enabled;
      case 'events':
        return config.seeders.events.enabled;
      default:
        return true;
    }
  }

  /**
   * Check if existing data should be cleared for a seeder
   */
  shouldClearExisting(seederName: string): boolean {
    const config = this.getSeedConfig();

    switch (seederName) {
      case 'languages':
        return config.seeders.languages.clearExisting;
      case 'event-categories':
        return config.seeders.eventCategories.clearExisting;
      case 'event-teams':
        return config.seeders.eventTeams.clearExisting;
      case 'events':
        return config.seeders.events.clearExisting;
      default:
        return false;
    }
  }

  /**
   * Check if validation is enabled
   */
  isValidationEnabled(): boolean {
    return this.getSeedConfig().validation.enabled;
  }

  /**
   * Check if strict validation is enabled
   */
  isStrictValidationEnabled(): boolean {
    return this.getSeedConfig().validation.strict;
  }

  /**
   * Check if verbose logging is enabled
   */
  isVerboseLoggingEnabled(): boolean {
    return this.getSeedConfig().logging.verbose;
  }

  /**
   * Get database configuration
   */
  getDatabaseConfig() {
    return this.getSeedConfig().database;
  }

  /**
   * Get environment
   */
  getEnvironment(): string {
    return this.getSeedConfig().environment;
  }

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }

  /**
   * Check if running in development
   */
  isDevelopment(): boolean {
    return this.getEnvironment() === 'development';
  }

  /**
   * Check if running in test environment
   */
  isTest(): boolean {
    return this.getEnvironment() === 'test';
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { SeedManagerService } from './seed-manager.service';
import { LanguageSeeder } from '../../language/language.seeder';
import { EventCategorySeeder } from '../../event-category/event-category.seeder';
import { EventTeamSeeder } from '../../event-team/event-team.seeder';
import { EventSeeder } from '../../event/event.seeder';

@Injectable()
export class SeedCommandService {
  private readonly logger = new Logger(SeedCommandService.name);

  constructor(
    private readonly seedManager: SeedManagerService,
    private readonly languageSeeder: LanguageSeeder,
    private readonly eventCategorySeeder: EventCategorySeeder,
    private readonly eventTeamSeeder: EventTeamSeeder,
    private readonly eventSeeder: EventSeeder,
  ) {
    this.registerSeeders();
  }

  /**
   * Register all seeders with dependencies and priorities
   */
  private registerSeeders(): void {
    // Register seeders with dependencies
    this.seedManager.registerSeeder('languages', this.languageSeeder, [], 1);
    this.seedManager.registerSeeder(
      'event-categories',
      this.eventCategorySeeder,
      [],
      2,
    );
    this.seedManager.registerSeeder('event-teams', this.eventTeamSeeder, [], 3);
    this.seedManager.registerSeeder(
      'events',
      this.eventSeeder,
      ['languages', 'event-categories', 'event-teams'],
      4,
    );
  }

  /**
   * Run all seeders in dependency order
   */
  async runAllSeeds(): Promise<Map<string, any>> {
    this.logger.log('Starting all seeders...');
    return await this.seedManager.runAll();
  }

  /**
   * Run seeders by priority
   */
  async runSeedsByPriority(): Promise<Map<string, any>> {
    this.logger.log('Starting seeders by priority...');
    return await this.seedManager.runByPriority();
  }

  /**
   * Run a specific seeder
   */
  async runSpecificSeeder(seederName: string): Promise<any> {
    this.logger.log(`Running specific seeder: ${seederName}`);
    return await this.seedManager.runSeeder(seederName);
  }

  /**
   * Run only essential seeders (languages, categories, teams)
   */
  async runEssentialSeeds(): Promise<Map<string, any>> {
    this.logger.log('Running essential seeders...');
    const results = new Map<string, any>();

    const essentialSeeders = ['languages', 'event-categories', 'event-teams'];

    for (const seederName of essentialSeeders) {
      try {
        const result = await this.seedManager.runSeeder(seederName);
        results.set(seederName, result);

        if (!result.success) {
          this.logger.error(
            `Essential seeder ${seederName} failed: ${result.message}`,
          );
        } else {
          this.logger.log(
            `Essential seeder ${seederName} completed successfully`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Error running essential seeder ${seederName}: ${error.message}`,
        );
        results.set(seederName, {
          success: false,
          message: error.message,
          error,
        });
      }
    }

    return results;
  }

  /**
   * Run seeders with data validation
   */
  async runSeedsWithValidation(): Promise<Map<string, any>> {
    this.logger.log('Validating seeder dependencies...');

    if (!this.seedManager.validateDependencies()) {
      throw new Error('Seeder dependencies validation failed');
    }

    this.logger.log('Dependencies validated successfully');
    return await this.seedManager.runAll();
  }

  /**
   * Get status of all seeders
   */
  getSeederStatus(): { registered: string[]; results: Map<string, any> } {
    return {
      registered: this.seedManager.getRegisteredSeeders(),
      results: this.seedManager.getResults(),
    };
  }

  /**
   * Clear all seeder results
   */
  clearResults(): void {
    this.seedManager.clearResults();
    this.logger.log('Seeder results cleared');
  }

  /**
   * Get available seeder commands
   */
  getAvailableCommands(): string[] {
    return [
      'runAllSeeds',
      'runSeedsByPriority',
      'runEssentialSeeds',
      'runSeedsWithValidation',
      'runSpecificSeeder',
      'getSeederStatus',
      'clearResults',
    ];
  }
}

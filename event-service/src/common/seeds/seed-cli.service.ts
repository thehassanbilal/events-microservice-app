import { Injectable, Logger } from '@nestjs/common';
import { SeedCommandService } from './seed-command.service';

export interface SeedCLIOptions {
  command?: string;
  seederName?: string;
  verbose?: boolean;
  dryRun?: boolean;
}

@Injectable()
export class SeedCLIService {
  private readonly logger = new Logger(SeedCLIService.name);

  constructor(private readonly seedCommandService: SeedCommandService) {}

  /**
   * Run seeds based on CLI arguments
   */
  async runFromCLI(options: SeedCLIOptions): Promise<void> {
    try {
      this.logger.log('Starting seed CLI...');

      if (options.verbose) {
        this.logger.log(`CLI Options: ${JSON.stringify(options, null, 2)}`);
      }

      if (options.dryRun) {
        this.logger.log('DRY RUN MODE - No actual seeding will be performed');
        this.logger.log('Available commands:');
        const commands = this.seedCommandService.getAvailableCommands();
        commands.forEach((cmd) => this.logger.log(`  - ${cmd}`));
        return;
      }

      let results: any;

      switch (options.command) {
        case 'run-all':
          this.logger.log('Running all seeders...');
          results = await this.seedCommandService.runAllSeeds();
          break;

        case 'run-essential':
          this.logger.log('Running essential seeders...');
          results = await this.seedCommandService.runEssentialSeeds();
          break;

        case 'run-specific':
          if (!options.seederName) {
            throw new Error('Seeder name is required for run-specific command');
          }
          this.logger.log(`Running specific seeder: ${options.seederName}`);
          results = await this.seedCommandService.runSpecificSeeder(
            options.seederName,
          );
          break;

        case 'run-by-priority':
          this.logger.log('Running seeders by priority...');
          results = await this.seedCommandService.runSeedsByPriority();
          break;

        case 'run-with-validation':
          this.logger.log('Running seeders with validation...');
          results = await this.seedCommandService.runSeedsWithValidation();
          break;

        case 'status':
          this.logger.log('Getting seeder status...');
          const status = this.seedCommandService.getSeederStatus();
          this.logger.log(
            `Registered seeders: ${status.registered.join(', ')}`,
          );
          this.logger.log(
            `Results: ${JSON.stringify(Object.fromEntries(status.results), null, 2)}`,
          );
          return;

        case 'clear-results':
          this.logger.log('Clearing seeder results...');
          this.seedCommandService.clearResults();
          this.logger.log('Seeder results cleared successfully');
          return;

        case 'help':
        default:
          this.showHelp();
          return;
      }

      // Display results
      if (results instanceof Map) {
        this.logger.log('Seeder Results:');
        for (const [seederName, result] of results.entries()) {
          const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
          this.logger.log(`${status} - ${seederName}: ${result.message}`);

          if (options.verbose && result.data) {
            this.logger.log(`  Data: ${JSON.stringify(result.data, null, 2)}`);
          }

          if (!result.success && result.error) {
            this.logger.error(
              `  Error: ${JSON.stringify(result.error, null, 2)}`,
            );
          }
        }
      } else {
        const status = results.success ? '✅ SUCCESS' : '❌ FAILED';
        this.logger.log(`${status} - ${results.message}`);

        if (options.verbose && results.data) {
          this.logger.log(`Data: ${JSON.stringify(results.data, null, 2)}`);
        }
      }

      this.logger.log('Seed CLI completed');
    } catch (error) {
      this.logger.error(`Seed CLI failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Show help information
   */
  private showHelp(): void {
    this.logger.log(`
🌱 Event Service Seed CLI

Usage:
  npm run seed:all                    # Run all seeders
  npm run seed:essential              # Run essential seeders only
  npm run seed:specific <name>        # Run specific seeder
  npm run seed:priority               # Run seeders by priority
  npm run seed:validate               # Run seeders with validation
  npm run seed:status                 # Show seeder status
  npm run seed:clear                  # Clear seeder results
  npm run seed:help                   # Show this help

Available Seeders:
  - languages
  - event-categories
  - event-teams
  - events

Options:
  --verbose                           # Enable verbose logging
  --dry-run                          # Show what would be done without executing
  --help                             # Show this help message

Examples:
  npm run seed:all --verbose
  npm run seed:specific languages
  npm run seed:essential --dry-run
    `);
  }

  /**
   * Parse command line arguments
   */
  parseCLIArgs(args: string[]): SeedCLIOptions {
    const options: SeedCLIOptions = {};

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case '--verbose':
        case '-v':
          options.verbose = true;
          break;

        case '--dry-run':
        case '-d':
          options.dryRun = true;
          break;

        case '--help':
        case '-h':
          options.command = 'help';
          break;

        case 'run-all':
          options.command = 'run-all';
          break;

        case 'run-essential':
          options.command = 'run-essential';
          break;

        case 'run-specific':
          options.command = 'run-specific';
          if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
            options.seederName = args[i + 1];
            i++; // Skip the next argument
          }
          break;

        case 'run-by-priority':
          options.command = 'run-by-priority';
          break;

        case 'run-with-validation':
          options.command = 'run-with-validation';
          break;

        case 'status':
          options.command = 'status';
          break;

        case 'clear-results':
          options.command = 'clear-results';
          break;

        default:
          if (!options.command && !arg.startsWith('-')) {
            options.command = arg;
          }
          break;
      }
    }

    return options;
  }
}

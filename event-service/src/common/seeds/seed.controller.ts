import {
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SeedCommandService } from './seed-command.service';

@Controller('seeds')
export class SeedController {
  constructor(private readonly seedCommandService: SeedCommandService) {}

  @Post('run-all')
  async runAllSeeds() {
    try {
      const results = await this.seedCommandService.runAllSeeds();
      const response = {};

      for (const [seederName, result] of results.entries()) {
        response[seederName] = {
          success: result.success,
          message: result.message,
          data: result.data,
        };
      }

      return {
        success: true,
        message: 'All seeders completed',
        results: response,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to run all seeders: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('run-essential')
  async runEssentialSeeds() {
    try {
      const results = await this.seedCommandService.runEssentialSeeds();
      const response = {};

      for (const [seederName, result] of results.entries()) {
        response[seederName] = {
          success: result.success,
          message: result.message,
          data: result.data,
        };
      }

      return {
        success: true,
        message: 'Essential seeders completed',
        results: response,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to run essential seeders: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('run/:seederName')
  async runSpecificSeeder(@Param('seederName') seederName: string) {
    try {
      const result =
        await this.seedCommandService.runSpecificSeeder(seederName);

      return {
        success: result.success,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to run seeder '${seederName}': ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('run-by-priority')
  async runSeedsByPriority() {
    try {
      const results = await this.seedCommandService.runSeedsByPriority();
      const response = {};

      for (const [seederName, result] of results.entries()) {
        response[seederName] = {
          success: result.success,
          message: result.message,
          data: result.data,
        };
      }

      return {
        success: true,
        message: 'Seeders completed by priority',
        results: response,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to run seeders by priority: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('run-with-validation')
  async runSeedsWithValidation() {
    try {
      const results = await this.seedCommandService.runSeedsWithValidation();
      const response = {};

      for (const [seederName, result] of results.entries()) {
        response[seederName] = {
          success: result.success,
          message: result.message,
          data: result.data,
        };
      }

      return {
        success: true,
        message: 'Seeders completed with validation',
        results: response,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to run seeders with validation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('status')
  getSeederStatus() {
    try {
      const status = this.seedCommandService.getSeederStatus();

      return {
        success: true,
        registered: status.registered,
        results: Object.fromEntries(status.results),
      };
    } catch (error) {
      throw new HttpException(
        `Failed to get seeder status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('available-commands')
  getAvailableCommands() {
    try {
      const commands = this.seedCommandService.getAvailableCommands();

      return {
        success: true,
        commands,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to get available commands: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('clear-results')
  clearResults() {
    try {
      this.seedCommandService.clearResults();

      return {
        success: true,
        message: 'Seeder results cleared successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to clear results: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

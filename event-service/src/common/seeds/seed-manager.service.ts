import { Injectable, Logger } from '@nestjs/common';
import { BaseSeeder, SeedResult } from './base.seeder';

export interface SeederInfo {
  name: string;
  seeder: BaseSeeder;
  dependencies?: string[];
  priority?: number;
}

@Injectable()
export class SeedManagerService {
  private readonly logger = new Logger(SeedManagerService.name);
  private seeders: Map<string, SeederInfo> = new Map();
  private results: Map<string, SeedResult> = new Map();

  /**
   * Register a seeder with optional dependencies
   */
  registerSeeder(
    name: string,
    seeder: BaseSeeder,
    dependencies: string[] = [],
    priority: number = 0,
  ): void {
    this.seeders.set(name, {
      name,
      seeder,
      dependencies,
      priority,
    });
    this.logger.log(`Registered seeder: ${name}`);
  }

  /**
   * Run all registered seeders in dependency order
   */
  async runAll(): Promise<Map<string, SeedResult>> {
    this.logger.log('Starting seed process...');

    const sortedSeeders = this.sortSeedersByDependencies();

    for (const seederInfo of sortedSeeders) {
      try {
        this.logger.log(`Running seeder: ${seederInfo.name}`);
        const result = await seederInfo.seeder.run();
        this.results.set(seederInfo.name, result);

        if (!result.success) {
          this.logger.error(
            `Seeder ${seederInfo.name} failed: ${result.message}`,
          );
          // Continue with other seeders unless critical
        } else {
          this.logger.log(`Seeder ${seederInfo.name} completed successfully`);
        }
      } catch (error) {
        const errorResult: SeedResult = {
          success: false,
          message: `Unexpected error in ${seederInfo.name}: ${error.message}`,
          error,
        };
        this.results.set(seederInfo.name, errorResult);
        this.logger.error(
          `Unexpected error in ${seederInfo.name}: ${error.message}`,
        );
      }
    }

    this.logger.log('Seed process completed');
    return this.results;
  }

  /**
   * Run a specific seeder by name
   */
  async runSeeder(name: string): Promise<SeedResult> {
    const seederInfo = this.seeders.get(name);
    if (!seederInfo) {
      throw new Error(`Seeder '${name}' not found`);
    }

    this.logger.log(`Running specific seeder: ${name}`);
    const result = await seederInfo.seeder.run();
    this.results.set(name, result);
    return result;
  }

  /**
   * Run seeders by priority (lowest number = highest priority)
   */
  async runByPriority(): Promise<Map<string, SeedResult>> {
    const sortedSeeders = Array.from(this.seeders.values()).sort(
      (a, b) => (a.priority || 0) - (b.priority || 0),
    );

    for (const seederInfo of sortedSeeders) {
      try {
        this.logger.log(
          `Running seeder: ${seederInfo.name} (priority: ${seederInfo.priority})`,
        );
        const result = await seederInfo.seeder.run();
        this.results.set(seederInfo.name, result);

        if (!result.success) {
          this.logger.error(
            `Seeder ${seederInfo.name} failed: ${result.message}`,
          );
        } else {
          this.logger.log(`Seeder ${seederInfo.name} completed successfully`);
        }
      } catch (error) {
        const errorResult: SeedResult = {
          success: false,
          message: `Unexpected error in ${seederInfo.name}: ${error.message}`,
          error,
        };
        this.results.set(seederInfo.name, errorResult);
        this.logger.error(
          `Unexpected error in ${seederInfo.name}: ${error.message}`,
        );
      }
    }

    return this.results;
  }

  /**
   * Get all registered seeders
   */
  getRegisteredSeeders(): string[] {
    return Array.from(this.seeders.keys());
  }

  /**
   * Get results for all seeders
   */
  getResults(): Map<string, SeedResult> {
    return this.results;
  }

  /**
   * Clear all results
   */
  clearResults(): void {
    this.results.clear();
  }

  /**
   * Sort seeders by dependencies using topological sort
   */
  private sortSeedersByDependencies(): SeederInfo[] {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: SeederInfo[] = [];

    const visit = (name: string) => {
      if (temp.has(name)) {
        throw new Error(`Circular dependency detected: ${name}`);
      }
      if (visited.has(name)) {
        return;
      }

      const seederInfo = this.seeders.get(name);
      if (!seederInfo) {
        throw new Error(`Seeder '${name}' not found`);
      }

      temp.add(name);

      // Visit dependencies first
      for (const dependency of seederInfo.dependencies || []) {
        visit(dependency);
      }

      temp.delete(name);
      visited.add(name);
      result.push(seederInfo);
    };

    for (const name of this.seeders.keys()) {
      if (!visited.has(name)) {
        visit(name);
      }
    }

    return result;
  }

  /**
   * Validate dependencies exist
   */
  validateDependencies(): boolean {
    for (const [name, seederInfo] of this.seeders.entries()) {
      for (const dependency of seederInfo.dependencies || []) {
        if (!this.seeders.has(dependency)) {
          this.logger.error(
            `Seeder '${name}' depends on '${dependency}' which is not registered`,
          );
          return false;
        }
      }
    }
    return true;
  }
}

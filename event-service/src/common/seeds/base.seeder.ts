import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

export interface SeedResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

@Injectable()
export abstract class BaseSeeder {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(@InjectConnection() protected readonly connection?: Connection) {}

  /**
   * Abstract method that must be implemented by each seeder
   */
  abstract seed(): Promise<SeedResult>;

  /**
   * Run seeder with transaction support
   */
  async run(): Promise<SeedResult> {
    if (!this.connection) {
      this.logger.warn(
        'No database connection available, running without transaction support',
      );
      return await this.seed();
    }

    const session = await this.connection.startSession();

    try {
      this.logger.log(`Starting ${this.constructor.name}...`);

      await session.withTransaction(async () => {
        const result = await this.seed();
        if (!result.success) {
          throw new Error(result.message);
        }
        return result;
      });

      this.logger.log(`${this.constructor.name} completed successfully`);
      return {
        success: true,
        message: `${this.constructor.name} completed successfully`,
      };
    } catch (error) {
      this.logger.error(`Error in ${this.constructor.name}: ${error.message}`);
      return {
        success: false,
        message: `Error in ${this.constructor.name}: ${error.message}`,
        error,
      };
    } finally {
      await session.endSession();
    }
  }

  /**
   * Check if data already exists to prevent duplicate seeding
   */
  protected async checkIfExists<T>(
    model: any,
    query: any,
    errorMessage: string = 'Data already exists',
  ): Promise<boolean> {
    try {
      const existing = await model.findOne(query).exec();
      if (existing) {
        this.logger.warn(errorMessage);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Error checking existence: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create data with error handling
   */
  protected async createData<T>(
    model: any,
    data: T | T[],
    errorMessage: string = 'Error creating data',
  ): Promise<any> {
    try {
      const result = await model.create(data);
      this.logger.log(
        `Created ${Array.isArray(data) ? data.length : 1} record(s)`,
      );
      return result;
    } catch (error) {
      this.logger.error(`${errorMessage}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update data with error handling
   */
  protected async updateData<T>(
    model: any,
    query: any,
    update: any,
    errorMessage: string = 'Error updating data',
  ): Promise<any> {
    try {
      const result = await model
        .findOneAndUpdate(query, update, { new: true })
        .exec();
      this.logger.log('Record updated successfully');
      return result;
    } catch (error) {
      this.logger.error(`${errorMessage}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete data with error handling
   */
  protected async deleteData<T>(
    model: any,
    query: any,
    errorMessage: string = 'Error deleting data',
  ): Promise<any> {
    try {
      const result = await model.deleteMany(query).exec();
      this.logger.log(`Deleted ${result.deletedCount} record(s)`);
      return result;
    } catch (error) {
      this.logger.error(`${errorMessage}: ${error.message}`);
      throw error;
    }
  }
}

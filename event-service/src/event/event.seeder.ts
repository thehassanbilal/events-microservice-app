import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/event.schema';
import { VirtualEvent } from './schema/virtual-event.schema';
import { PhysicalEvent } from './schema/physical-event.schema';
import { EventCategory } from '../event-category/schema/event-category.schema';
import { EventTeam } from '../event-team/schema/event-team.schema';
import { Language } from '../language/schema/language.schema';
import { BaseSeeder, SeedResult } from '../common/seeds/base.seeder';
import { EventTypeEnum } from './enum/event-type-enum';
import { EventStatus } from './enum/event-status.enum';
import { VirtualEventSource } from './enum/virtual-event-source.enum';

@Injectable()
export class EventSeeder extends BaseSeeder {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(VirtualEvent.name)
    private virtualEventModel: Model<VirtualEvent>,
    @InjectModel(PhysicalEvent.name)
    private physicalEventModel: Model<PhysicalEvent>,
    @InjectModel(EventCategory.name)
    private eventCategoryModel: Model<EventCategory>,
    @InjectModel(EventTeam.name) private eventTeamModel: Model<EventTeam>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {
    super();
  }

  async seed(): Promise<SeedResult> {
    try {
      // Get existing data for relationships
      const categories = await this.eventCategoryModel.find().exec();
      const teams = await this.eventTeamModel.find().exec();
      const languages = await this.languageModel.find().exec();

      if (
        categories.length === 0 ||
        teams.length === 0 ||
        languages.length === 0
      ) {
        return {
          success: false,
          message:
            'Required seed data (categories, teams, languages) not found. Please run those seeders first.',
        };
      }

      const events = [
        {
          eventType: EventTypeEnum.VIRTUAL,
          team: teams[0]._id, // Marketing Team
          category: categories[0]._id, // Technology
          languages: [languages[0]._id, languages[1]._id], // English US, English GB
          breaks: [
            { from: '10:00', to: '10:15' },
            { from: '12:00', to: '13:00' },
            { from: '15:00', to: '15:15' },
          ],
          status: EventStatus.PUBLISHED,
          virtualEvent: {
            meetingUrl: 'https://zoom.us/j/123456789',
            meetingId: '123456789',
            password: 'Tech2024!',
            source: VirtualEventSource.ZOOM,
            startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            duration: 120,
            maxParticipants: 100,
          },
        },
        {
          eventType: EventTypeEnum.PHYSICAL,
          team: teams[1]._id, // Technical Team
          category: categories[1]._id, // Business
          languages: [languages[0]._id], // English US
          breaks: [
            { from: '09:00', to: '09:15' },
            { from: '11:00', to: '12:00' },
            { from: '14:00', to: '14:15' },
          ],
          status: EventStatus.PUBLISHED,
          physicalEvent: {
            venue: 'Tech Conference Center, San Francisco',
            startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            duration: 180,
            attendees: [
              {
                name: 'Alice Johnson',
                email: 'alice.johnson@example.com',
                phone: '+1-555-0101',
              },
              {
                name: 'Bob Smith',
                email: 'bob.smith@example.com',
                phone: '+1-555-0102',
              },
              {
                name: 'Carol Davis',
                email: 'carol.davis@example.com',
                phone: '+1-555-0103',
              },
            ],
          },
        },
        {
          eventType: EventTypeEnum.VIRTUAL,
          team: teams[2]._id, // Operations Team
          category: categories[2]._id, // Education
          languages: [languages[2]._id, languages[3]._id], // French, German
          breaks: [
            { from: '10:30', to: '10:45' },
            { from: '12:30', to: '13:30' },
          ],
          status: EventStatus.DRAFT,
          virtualEvent: {
            meetingUrl: 'https://meet.google.com/abc-defg-hij',
            meetingId: 'abc-defg-hij',
            password: 'Edu2024!',
            source: VirtualEventSource.GOOGLE_MEET,
            startTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
            duration: 90,
            maxParticipants: 50,
          },
        },
        {
          eventType: EventTypeEnum.PHYSICAL,
          team: teams[3]._id, // Sales Team
          category: categories[3]._id, // Health & Wellness
          languages: [languages[0]._id, languages[4]._id], // English US, Italian
          breaks: [
            { from: '09:30', to: '09:45' },
            { from: '11:30', to: '12:30' },
            { from: '15:30', to: '15:45' },
          ],
          status: EventStatus.PUBLISHED,
          physicalEvent: {
            venue: 'Wellness Center, New York',
            startTime: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days from now
            duration: 240,
            attendees: [
              {
                name: 'David Wilson',
                email: 'david.wilson@example.com',
                phone: '+1-555-0201',
              },
              {
                name: 'Eva Brown',
                email: 'eva.brown@example.com',
                phone: '+1-555-0202',
              },
            ],
          },
        },
        {
          eventType: EventTypeEnum.VIRTUAL,
          team: teams[4]._id, // Content Team
          category: categories[4]._id, // Arts & Culture
          languages: [languages[0]._id, languages[5]._id], // English US, Spanish
          breaks: [
            { from: '10:00', to: '10:15' },
            { from: '12:00', to: '13:00' },
          ],
          status: EventStatus.DRAFT,
          virtualEvent: {
            meetingUrl: 'https://zoom.us/j/987654321',
            meetingId: '987654321',
            password: 'Arts2024!',
            source: VirtualEventSource.ZOOM,
            startTime: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
            duration: 150,
            maxParticipants: 75,
          },
        },
      ];

      let createdCount = 0;
      let skippedCount = 0;

      for (const eventData of events) {
        const { virtualEvent, physicalEvent, ...eventFields } = eventData;

        // Check if event already exists (by checking unique fields)
        const exists = await this.checkIfExists(
          this.eventModel,
          {
            eventType: eventFields.eventType,
            team: eventFields.team,
            category: eventFields.category,
          },
          `Event with similar configuration already exists`,
        );

        if (!exists) {
          // Create the main event
          const event = await this.createData(this.eventModel, eventFields);

          // Create the specific event type
          if (eventFields.eventType === EventTypeEnum.VIRTUAL && virtualEvent) {
            await this.createData(this.virtualEventModel, {
              ...virtualEvent,
              event: event._id,
            });
          } else if (
            eventFields.eventType === EventTypeEnum.PHYSICAL &&
            physicalEvent
          ) {
            await this.createData(this.physicalEventModel, {
              ...physicalEvent,
              event: event._id,
            });
          }

          createdCount++;
        } else {
          skippedCount++;
        }
      }

      return {
        success: true,
        message: `Event seeding completed. Created: ${createdCount}, Skipped: ${skippedCount}`,
        data: { created: createdCount, skipped: skippedCount },
      };
    } catch (error) {
      return {
        success: false,
        message: `Event seeding failed: ${error.message}`,
        error,
      };
    }
  }
}

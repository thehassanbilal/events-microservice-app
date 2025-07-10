import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventTeam } from './schema/event-team.schema';
import { BaseSeeder, SeedResult } from '../common/seeds/base.seeder';

@Injectable()
export class EventTeamSeeder extends BaseSeeder {
  constructor(
    @InjectModel(EventTeam.name) private eventTeamModel: Model<EventTeam>,
  ) {
    super();
  }

  async seed(): Promise<SeedResult> {
    try {
      const teams = [
        {
          name: 'Marketing Team',
          description:
            'Handles event marketing and promotion across all channels',
          teamInfo: {
            teamLead: 'John Smith',
            contactEmail: 'marketing@events.com',
            contactPhone: '+1-555-0100',
            maxMembers: 8,
            isActive: true,
          },
          members: [
            {
              name: 'John Smith',
              role: 'Marketing Manager',
              email: 'john.smith@example.com',
              phone: '+1-555-0101',
              department: 'Marketing',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'Sarah Johnson',
              role: 'Social Media Specialist',
              email: 'sarah.johnson@example.com',
              phone: '+1-555-0102',
              department: 'Marketing',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Mike Davis',
              role: 'Content Creator',
              email: 'mike.davis@example.com',
              phone: '+1-555-0103',
              department: 'Marketing',
              isActive: true,
              joinedAt: new Date('2023-01-20'),
            },
            {
              name: 'Emily Chen',
              role: 'Digital Marketing Specialist',
              email: 'emily.chen@example.com',
              phone: '+1-555-0104',
              department: 'Marketing',
              isActive: true,
              joinedAt: new Date('2023-03-10'),
            },
          ],
        },
        {
          name: 'Technical Team',
          description:
            'Manages technical aspects of events including AV, streaming, and IT support',
          teamInfo: {
            teamLead: 'Alex Chen',
            contactEmail: 'tech@events.com',
            contactPhone: '+1-555-0200',
            maxMembers: 6,
            isActive: true,
          },
          members: [
            {
              name: 'Alex Chen',
              role: 'Technical Lead',
              email: 'alex.chen@example.com',
              phone: '+1-555-0201',
              department: 'Technology',
              isActive: true,
              joinedAt: new Date('2023-01-10'),
            },
            {
              name: 'Lisa Wang',
              role: 'AV Specialist',
              email: 'lisa.wang@example.com',
              phone: '+1-555-0202',
              department: 'Technology',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'David Kim',
              role: 'IT Support',
              email: 'david.kim@example.com',
              phone: '+1-555-0203',
              department: 'Technology',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Ryan Patel',
              role: 'Streaming Engineer',
              email: 'ryan.patel@example.com',
              phone: '+1-555-0204',
              department: 'Technology',
              isActive: true,
              joinedAt: new Date('2023-03-15'),
            },
          ],
        },
        {
          name: 'Operations Team',
          description:
            'Handles event logistics, venue coordination, and operational planning',
          teamInfo: {
            teamLead: 'Emma Wilson',
            contactEmail: 'operations@events.com',
            contactPhone: '+1-555-0300',
            maxMembers: 7,
            isActive: true,
          },
          members: [
            {
              name: 'Emma Wilson',
              role: 'Operations Manager',
              email: 'emma.wilson@example.com',
              phone: '+1-555-0301',
              department: 'Operations',
              isActive: true,
              joinedAt: new Date('2023-01-05'),
            },
            {
              name: 'Tom Brown',
              role: 'Logistics Coordinator',
              email: 'tom.brown@example.com',
              phone: '+1-555-0302',
              department: 'Operations',
              isActive: true,
              joinedAt: new Date('2023-01-20'),
            },
            {
              name: 'Rachel Green',
              role: 'Venue Coordinator',
              email: 'rachel.green@example.com',
              phone: '+1-555-0303',
              department: 'Operations',
              isActive: true,
              joinedAt: new Date('2023-02-10'),
            },
            {
              name: 'Carlos Rodriguez',
              role: 'Event Planner',
              email: 'carlos.rodriguez@example.com',
              phone: '+1-555-0304',
              department: 'Operations',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
          ],
        },
        {
          name: 'Sales Team',
          description:
            'Manages event sales, partnerships, and revenue generation',
          teamInfo: {
            teamLead: 'Chris Lee',
            contactEmail: 'sales@events.com',
            contactPhone: '+1-555-0400',
            maxMembers: 5,
            isActive: true,
          },
          members: [
            {
              name: 'Chris Lee',
              role: 'Sales Director',
              email: 'chris.lee@example.com',
              phone: '+1-555-0401',
              department: 'Sales',
              isActive: true,
              joinedAt: new Date('2023-01-01'),
            },
            {
              name: 'Maria Garcia',
              role: 'Partnership Manager',
              email: 'maria.garcia@example.com',
              phone: '+1-555-0402',
              department: 'Sales',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'James Taylor',
              role: 'Account Executive',
              email: 'james.taylor@example.com',
              phone: '+1-555-0403',
              department: 'Sales',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Sophia Kim',
              role: 'Business Development',
              email: 'sophia.kim@example.com',
              phone: '+1-555-0404',
              department: 'Sales',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
          ],
        },
        {
          name: 'Content Team',
          description:
            'Creates and manages event content, graphics, and communications',
          teamInfo: {
            teamLead: 'Anna Rodriguez',
            contactEmail: 'content@events.com',
            contactPhone: '+1-555-0500',
            maxMembers: 6,
            isActive: true,
          },
          members: [
            {
              name: 'Anna Rodriguez',
              role: 'Content Manager',
              email: 'anna.rodriguez@example.com',
              phone: '+1-555-0501',
              department: 'Content',
              isActive: true,
              joinedAt: new Date('2023-01-10'),
            },
            {
              name: 'Kevin Patel',
              role: 'Copywriter',
              email: 'kevin.patel@example.com',
              phone: '+1-555-0502',
              department: 'Content',
              isActive: true,
              joinedAt: new Date('2023-01-20'),
            },
            {
              name: 'Sophie Martin',
              role: 'Graphic Designer',
              email: 'sophie.martin@example.com',
              phone: '+1-555-0503',
              department: 'Content',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Marcus Johnson',
              role: 'Video Editor',
              email: 'marcus.johnson@example.com',
              phone: '+1-555-0504',
              department: 'Content',
              isActive: true,
              joinedAt: new Date('2023-03-15'),
            },
          ],
        },
        {
          name: 'Customer Support Team',
          description:
            'Provides customer support, help desk, and attendee assistance',
          teamInfo: {
            teamLead: 'Daniel White',
            contactEmail: 'support@events.com',
            contactPhone: '+1-555-0600',
            maxMembers: 8,
            isActive: true,
          },
          members: [
            {
              name: 'Daniel White',
              role: 'Support Manager',
              email: 'daniel.white@example.com',
              phone: '+1-555-0601',
              department: 'Support',
              isActive: true,
              joinedAt: new Date('2023-01-05'),
            },
            {
              name: 'Jessica Clark',
              role: 'Customer Success Specialist',
              email: 'jessica.clark@example.com',
              phone: '+1-555-0602',
              department: 'Support',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'Ryan Anderson',
              role: 'Help Desk Coordinator',
              email: 'ryan.anderson@example.com',
              phone: '+1-555-0603',
              department: 'Support',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Amanda Foster',
              role: 'Technical Support',
              email: 'amanda.foster@example.com',
              phone: '+1-555-0604',
              department: 'Support',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
          ],
        },
        {
          name: 'Finance Team',
          description:
            'Manages event finances, budgeting, and financial reporting',
          teamInfo: {
            teamLead: 'Amanda Thompson',
            contactEmail: 'finance@events.com',
            contactPhone: '+1-555-0700',
            maxMembers: 4,
            isActive: true,
          },
          members: [
            {
              name: 'Amanda Thompson',
              role: 'Finance Manager',
              email: 'amanda.thompson@example.com',
              phone: '+1-555-0701',
              department: 'Finance',
              isActive: true,
              joinedAt: new Date('2023-01-01'),
            },
            {
              name: 'Robert Martinez',
              role: 'Budget Analyst',
              email: 'robert.martinez@example.com',
              phone: '+1-555-0702',
              department: 'Finance',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'Jennifer Lewis',
              role: 'Accounts Payable',
              email: 'jennifer.lewis@example.com',
              phone: '+1-555-0703',
              department: 'Finance',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Michael Chang',
              role: 'Financial Analyst',
              email: 'michael.chang@example.com',
              phone: '+1-555-0704',
              department: 'Finance',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
          ],
        },
        {
          name: 'Legal Team',
          description:
            'Handles legal aspects, contracts, and compliance for events',
          teamInfo: {
            teamLead: 'Michael Hall',
            contactEmail: 'legal@events.com',
            contactPhone: '+1-555-0800',
            maxMembers: 3,
            isActive: true,
          },
          members: [
            {
              name: 'Michael Hall',
              role: 'Legal Counsel',
              email: 'michael.hall@example.com',
              phone: '+1-555-0801',
              department: 'Legal',
              isActive: true,
              joinedAt: new Date('2023-01-01'),
            },
            {
              name: 'Laura Adams',
              role: 'Compliance Officer',
              email: 'laura.adams@example.com',
              phone: '+1-555-0802',
              department: 'Legal',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'Steven Baker',
              role: 'Contract Specialist',
              email: 'steven.baker@example.com',
              phone: '+1-555-0803',
              department: 'Legal',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
          ],
        },
        {
          name: 'Quality Assurance Team',
          description:
            'Ensures event quality, testing, and process improvement',
          teamInfo: {
            teamLead: 'Sarah Williams',
            contactEmail: 'qa@events.com',
            contactPhone: '+1-555-0900',
            maxMembers: 5,
            isActive: true,
          },
          members: [
            {
              name: 'Sarah Williams',
              role: 'QA Manager',
              email: 'sarah.williams@example.com',
              phone: '+1-555-0901',
              department: 'Quality Assurance',
              isActive: true,
              joinedAt: new Date('2023-01-10'),
            },
            {
              name: 'Brian Davis',
              role: 'Test Coordinator',
              email: 'brian.davis@example.com',
              phone: '+1-555-0902',
              department: 'Quality Assurance',
              isActive: true,
              joinedAt: new Date('2023-01-20'),
            },
            {
              name: 'Lisa Chen',
              role: 'Process Analyst',
              email: 'lisa.chen@example.com',
              phone: '+1-555-0903',
              department: 'Quality Assurance',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'David Wilson',
              role: 'Quality Specialist',
              email: 'david.wilson@example.com',
              phone: '+1-555-0904',
              department: 'Quality Assurance',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
          ],
        },
        {
          name: 'Innovation Team',
          description:
            'Drives innovation, new technologies, and creative solutions',
          teamInfo: {
            teamLead: 'Alex Rivera',
            contactEmail: 'innovation@events.com',
            contactPhone: '+1-555-1000',
            maxMembers: 4,
            isActive: true,
          },
          members: [
            {
              name: 'Alex Rivera',
              role: 'Innovation Lead',
              email: 'alex.rivera@example.com',
              phone: '+1-555-1001',
              department: 'Innovation',
              isActive: true,
              joinedAt: new Date('2023-01-15'),
            },
            {
              name: 'Emma Thompson',
              role: 'Research Analyst',
              email: 'emma.thompson@example.com',
              phone: '+1-555-1002',
              department: 'Innovation',
              isActive: true,
              joinedAt: new Date('2023-02-01'),
            },
            {
              name: 'Jordan Kim',
              role: 'Technology Scout',
              email: 'jordan.kim@example.com',
              phone: '+1-555-1003',
              department: 'Innovation',
              isActive: true,
              joinedAt: new Date('2023-03-01'),
            },
            {
              name: 'Taylor Johnson',
              role: 'Creative Strategist',
              email: 'taylor.johnson@example.com',
              phone: '+1-555-1004',
              department: 'Innovation',
              isActive: true,
              joinedAt: new Date('2023-03-15'),
            },
          ],
        },
      ];

      let createdCount = 0;
      let skippedCount = 0;

      for (const team of teams) {
        const exists = await this.checkIfExists(
          this.eventTeamModel,
          { name: team.name },
          `Event team '${team.name}' already exists`,
        );

        if (!exists) {
          await this.createData(this.eventTeamModel, team);
          createdCount++;
        } else {
          skippedCount++;
        }
      }

      return {
        success: true,
        message: `Event team seeding completed. Created: ${createdCount}, Skipped: ${skippedCount}`,
        data: { created: createdCount, skipped: skippedCount },
      };
    } catch (error) {
      return {
        success: false,
        message: `Event team seeding failed: ${error.message}`,
        error,
      };
    }
  }
}

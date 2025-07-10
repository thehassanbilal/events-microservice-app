import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventCategory } from './schema/event-category.schema';
import { BaseSeeder, SeedResult } from '../common/seeds/base.seeder';

@Injectable()
export class EventCategorySeeder extends BaseSeeder {
  constructor(
    @InjectModel(EventCategory.name)
    private eventCategoryModel: Model<EventCategory>,
  ) {
    super();
  }

  async seed(): Promise<SeedResult> {
    try {
      const categories = [
        {
          name: 'Technology',
          description:
            'Technology conferences, workshops, hackathons, and meetups covering software development, AI, cybersecurity, and emerging tech trends',
        },
        {
          name: 'Business',
          description:
            'Business conferences, networking events, seminars, and corporate training sessions for professionals and entrepreneurs',
        },
        {
          name: 'Education',
          description:
            'Educational workshops, training sessions, academic conferences, and learning events for students and professionals',
        },
        {
          name: 'Health & Wellness',
          description:
            'Health seminars, fitness events, wellness workshops, medical conferences, and mental health awareness events',
        },
        {
          name: 'Arts & Culture',
          description:
            'Art exhibitions, cultural events, creative workshops, museum events, and performing arts shows',
        },
        {
          name: 'Sports',
          description:
            'Sports tournaments, fitness events, athletic competitions, sports clinics, and recreational activities',
        },
        {
          name: 'Entertainment',
          description:
            'Concerts, shows, entertainment events, comedy nights, and performance arts for all audiences',
        },
        {
          name: 'Food & Drink',
          description:
            'Food festivals, wine tastings, culinary events, cooking classes, and gastronomy experiences',
        },
        {
          name: 'Science',
          description:
            'Scientific conferences, research presentations, STEM events, and academic symposiums',
        },
        {
          name: 'Environment',
          description:
            'Environmental awareness events, sustainability workshops, climate action events, and green technology conferences',
        },
        {
          name: 'Social Impact',
          description:
            'Charity events, community service activities, social causes, and nonprofit fundraising events',
        },
        {
          name: 'Professional Development',
          description:
            'Career workshops, skill development sessions, professional training, and leadership development events',
        },
        {
          name: 'Networking',
          description:
            'Networking events, meetups, professional gatherings, and industry-specific networking opportunities',
        },
        {
          name: 'Marketing & Sales',
          description:
            'Marketing conferences, sales training events, promotional activities, and digital marketing workshops',
        },
        {
          name: 'Finance',
          description:
            'Financial seminars, investment workshops, economic events, and personal finance education',
        },
        {
          name: 'Legal',
          description:
            'Legal seminars, compliance training, law-related events, and legal education workshops',
        },
        {
          name: 'Real Estate',
          description:
            'Real estate seminars, property showcases, investment events, and real estate education',
        },
        {
          name: 'Travel & Tourism',
          description:
            'Travel expos, tourism events, destination showcases, and travel industry conferences',
        },
        {
          name: 'Fashion',
          description:
            'Fashion shows, style workshops, design events, and fashion industry networking',
        },
        {
          name: 'Music',
          description:
            'Music concerts, performances, musical workshops, and music industry events',
        },
        {
          name: 'Gaming',
          description:
            'Gaming tournaments, esports events, game development workshops, and gaming industry conferences',
        },
        {
          name: 'Automotive',
          description:
            'Auto shows, car exhibitions, automotive industry events, and vehicle technology conferences',
        },
        {
          name: 'Agriculture',
          description:
            'Agricultural conferences, farming workshops, food production events, and sustainable agriculture seminars',
        },
        {
          name: 'Construction',
          description:
            'Construction industry events, building technology conferences, and construction management workshops',
        },
        {
          name: 'Healthcare',
          description:
            'Healthcare conferences, medical seminars, patient care events, and healthcare technology workshops',
        },
        {
          name: 'Transportation',
          description:
            'Transportation conferences, logistics events, supply chain workshops, and mobility technology seminars',
        },
        {
          name: 'Energy',
          description:
            'Energy conferences, renewable energy events, sustainability workshops, and energy technology seminars',
        },
        {
          name: 'Media & Communications',
          description:
            'Media conferences, journalism workshops, communication events, and digital media seminars',
        },
        {
          name: 'Government & Politics',
          description:
            'Government events, political conferences, public policy workshops, and civic engagement activities',
        },
        {
          name: 'Non-Profit & Philanthropy',
          description:
            'Nonprofit events, philanthropic activities, charity fundraisers, and community service events',
        },
        {
          name: 'Startup & Entrepreneurship',
          description:
            'Startup events, entrepreneurship workshops, pitch competitions, and innovation conferences',
        },
        {
          name: 'Research & Development',
          description:
            'R&D conferences, innovation workshops, research presentations, and development seminars',
        },
        {
          name: 'Human Resources',
          description:
            'HR conferences, talent management workshops, workplace culture events, and HR technology seminars',
        },
        {
          name: 'Customer Experience',
          description:
            'CX conferences, customer service workshops, user experience events, and customer engagement seminars',
        },
        {
          name: 'Data & Analytics',
          description:
            'Data science conferences, analytics workshops, business intelligence events, and data visualization seminars',
        },
        {
          name: 'Cybersecurity',
          description:
            'Cybersecurity conferences, security workshops, threat intelligence events, and cyber defense seminars',
        },
        {
          name: 'Blockchain & Cryptocurrency',
          description:
            'Blockchain conferences, crypto events, DeFi workshops, and digital asset seminars',
        },
        {
          name: 'Virtual Reality & Augmented Reality',
          description:
            'VR/AR conferences, immersive technology events, spatial computing workshops, and metaverse seminars',
        },
        {
          name: 'Internet of Things (IoT)',
          description:
            'IoT conferences, connected device workshops, smart technology events, and IoT platform seminars',
        },
        {
          name: 'Cloud Computing',
          description:
            'Cloud conferences, cloud technology workshops, infrastructure events, and cloud security seminars',
        },
        {
          name: 'Mobile Development',
          description:
            'Mobile app conferences, mobile technology workshops, app development events, and mobile UX seminars',
        },
        {
          name: 'Web Development',
          description:
            'Web development conferences, frontend/backend workshops, web technology events, and web design seminars',
        },
        {
          name: 'DevOps & Infrastructure',
          description:
            'DevOps conferences, infrastructure workshops, deployment events, and automation seminars',
        },
        {
          name: 'Quality Assurance & Testing',
          description:
            'QA conferences, testing workshops, quality events, and test automation seminars',
        },
        {
          name: 'Product Management',
          description:
            'Product management conferences, product strategy workshops, product development events, and product marketing seminars',
        },
        {
          name: 'User Experience (UX)',
          description:
            'UX conferences, design thinking workshops, user research events, and interface design seminars',
        },
        {
          name: 'Accessibility',
          description:
            'Accessibility conferences, inclusive design workshops, assistive technology events, and universal design seminars',
        },
      ];

      let createdCount = 0;
      let skippedCount = 0;

      for (const category of categories) {
        const exists = await this.checkIfExists(
          this.eventCategoryModel,
          { name: category.name },
          `Event category '${category.name}' already exists`,
        );

        if (!exists) {
          await this.createData(this.eventCategoryModel, category);
          createdCount++;
        } else {
          skippedCount++;
        }
      }

      return {
        success: true,
        message: `Event category seeding completed. Created: ${createdCount}, Skipped: ${skippedCount}`,
        data: { created: createdCount, skipped: skippedCount },
      };
    } catch (error) {
      return {
        success: false,
        message: `Event category seeding failed: ${error.message}`,
        error,
      };
    }
  }
}

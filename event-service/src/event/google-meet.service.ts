import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { UpdateGoogleMeetDto } from './dto/update-google-meet.dto';
import * as path from 'path';

@Injectable()
export class GoogleMeetService {
  private auth: GoogleAuth;
  private readonly logger = new Logger(GoogleMeetService.name);

  constructor(private readonly configService: ConfigService) {
    try {
      const keyFilePath = path.resolve(
        process.cwd(),
        'service-account-key.json',
      );

      this.auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: [
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/calendar.events',
        ],
      });

      // Set global auth for all Google API calls
      google.options({ auth: this.auth });
    } catch (error) {
      this.logger.error('Failed to initialize Google authentication', error);
      throw new HttpException(
        'Failed to initialize Google authentication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createGoogleMeet(createGoogleMeetDto: CreateGoogleMeetDto) {
    try {
      const calendar = google.calendar('v3');

      // We need to verify our application from google because we are using the service account
      // and added sensitive scopes.
      // Once we fill all the required fields, we can send verification request to google.

      const event = {
        summary: createGoogleMeetDto.summary,
        description: createGoogleMeetDto.description,
        start: {
          dateTime: createGoogleMeetDto.startTime,
          timeZone: createGoogleMeetDto.timeZone || 'UTC',
        },
        end: {
          dateTime:
            createGoogleMeetDto.endTime ||
            new Date(
              new Date(createGoogleMeetDto.startTime).getTime() +
                60 * 60 * 1000,
            ).toISOString(),
          timeZone: createGoogleMeetDto.timeZone || 'UTC',
        },
        visibility: 'default',
        reminders: {
          useDefault: true,
        },
        attendees: [{ email: 'hassanbilalchannell@gmail.com' }],
      };

      const response = await calendar.events.insert({
        auth: this.auth,
        calendarId: 'primary',
        requestBody: event,
        sendUpdates: 'all',
        conferenceDataVersion: 1,
      });

      this.logger.log(
        `Google Meet event created successfully: ${response.data.id}`,
      );

      return {
        meetingId: response.data.id,
        meetingUrl: response.data.hangoutLink,
        conferenceData: response.data.conferenceData,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
      };
    } catch (error) {
      this.logger.error('Failed to create Google Meet event', {
        message: error.message,
        response: error.response?.data,
      });

      if (error.code === 403) {
        throw new HttpException(
          'Insufficient permissions to create Google Meet event',
          HttpStatus.FORBIDDEN,
        );
      }

      if (error.code === 404) {
        throw new HttpException('Calendar not found', HttpStatus.NOT_FOUND);
      }

      if (error.code === 409) {
        throw new HttpException(
          'Conflicting meeting already exists',
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Failed to create Google Meet event',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateGoogleMeet(
    meetingId: string,
    updateGoogleMeetDto: UpdateGoogleMeetDto,
  ) {
    try {
      const calendar = google.calendar('v3');

      const event = {
        summary: updateGoogleMeetDto.summary,
        start: {
          dateTime: updateGoogleMeetDto.startTime,
          timeZone: updateGoogleMeetDto.timeZone,
        },
        end: {
          dateTime: updateGoogleMeetDto.endTime,
          timeZone: updateGoogleMeetDto.timeZone,
        },
      };

      const response = await calendar.events.patch({
        calendarId: 'primary',
        eventId: meetingId,
        requestBody: event,
      });

      this.logger.log(
        `Google Meet event updated successfully: ${response.data.id}`,
      );

      return {
        meetingId: response.data.id,
        meetingUrl: response.data.hangoutLink,
        conferenceData: response.data.conferenceData,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
      };
    } catch (error) {
      this.logger.error('Failed to update Google Meet event', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to update Google Meet event',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getGoogleMeet(meetingId: string) {
    try {
      const calendar = google.calendar('v3');
      const response = await calendar.events.get({
        calendarId: 'primary',
        eventId: meetingId,
      });

      return {
        meetingId: response.data.id,
        meetingUrl: response.data.hangoutLink,
        conferenceData: response.data.conferenceData,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
      };
    } catch (error) {
      this.logger.error('Failed to get Google Meet event', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to get Google Meet event',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteGoogleMeet(meetingId: string) {
    try {
      const calendar = google.calendar('v3');

      await calendar.events.delete({
        calendarId: 'primary',
        eventId: meetingId,
      });

      this.logger.log(`Google Meet event deleted successfully: ${meetingId}`);
    } catch (error) {
      this.logger.error('Failed to delete Google Meet event', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to delete Google Meet event',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { UpdateGoogleMeetDto } from './dto/update-google-meet.dto';
import * as crypto from 'crypto';
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
      const requestId = crypto.randomBytes(16).toString('hex');

      const sixtyMinutesFromStart = new Date(
        new Date(createGoogleMeetDto.startTime).getTime() + 60 * 60 * 1000,
      ).toISOString();

      const event = {
        summary: createGoogleMeetDto.summary,
        description: createGoogleMeetDto.description,
        start: {
          dateTime: createGoogleMeetDto.startTime,
          timeZone: createGoogleMeetDto.timeZone,
        },
        end: {
          dateTime: createGoogleMeetDto.endTime || sixtyMinutesFromStart,
          timeZone: createGoogleMeetDto.timeZone,
        },
        conferenceData: {
          createRequest: {
            requestId,
            // conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: true,
        },
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
      });

      this.logger.log(
        `Google Meet event created successfully: ${response.data.id}`,
      );

      return {
        meetingId: response.data.id,
        url: response.data.hangoutLink,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
        summary: response.data.summary,
        status: response.data.status,
        organizer: response.data.organizer,
        conferenceData: response.data.conferenceData,
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

      return response.data;
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

  async getGoogleMeetById(meetingId: string) {
    try {
      const calendar = google.calendar('v3');

      const response = await calendar.events.get({
        calendarId: 'primary',
        eventId: meetingId,
      });

      return response.data;
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

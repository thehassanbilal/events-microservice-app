import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { UpdateGoogleMeetDto } from './dto/update-google-meet.dto';

@Injectable()
export class GoogleMeetService {
  private oauth2Client: OAuth2Client;
  private readonly logger = new Logger(GoogleMeetService.name);

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');
    const refreshToken = this.configService.get<string>('GOOGLE_REFRESH_TOKEN');

    if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
      this.logger.error('Missing Google credentials in environment variables');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    );
    this.oauth2Client.setCredentials({ refresh_token: refreshToken });
  }

  private async refreshAccessToken() {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      this.oauth2Client.setCredentials(credentials);
      return credentials.access_token;
    } catch (error) {
      this.logger.error('Failed to refresh access token', {
        message: error.message,
      });
      throw new HttpException(
        'Failed to refresh access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async ensureAccessToken() {
    if (
      !this.oauth2Client.credentials.access_token ||
      this.oauth2Client.credentials.expiry_date < Date.now()
    ) {
      await this.refreshAccessToken();
    }
  }

  async createGoogleMeet(createGoogleMeetDto: CreateGoogleMeetDto) {
    await this.ensureAccessToken();

    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: this.oauth2Client,
      });

      const event = {
        summary: createGoogleMeetDto.summary,
        start: {
          dateTime: createGoogleMeetDto.startTime,
          timeZone: createGoogleMeetDto.timeZone,
        },
        end: {
          dateTime: createGoogleMeetDto.endTime,
          timeZone: createGoogleMeetDto.timeZone,
        },
        conferenceData: {
          createRequest: {
            requestId: 'sample123',
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
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
        url: response.data.hangoutLink,
        meetingId: response.data.id,
      };
    } catch (error) {
      this.logger.error('Failed to create Google Meet event', {
        message: error.message,
        response: error.response?.data,
      });
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
    await this.ensureAccessToken();

    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: this.oauth2Client,
      });

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
    await this.ensureAccessToken();

    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: this.oauth2Client,
      });

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
    await this.ensureAccessToken();

    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: this.oauth2Client,
      });

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

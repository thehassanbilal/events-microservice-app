import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CreateZoomMeetingDto } from './dto/create-zoom-meeting.dto';
import { UpdateZoomMeetingDto } from './dto/update-zoom-meeting.dto';

@Injectable()
export class ZoomService {
  constructor(private readonly configService: ConfigService) {}

  private getAuth0Token = 'https://zoom.us/oauth/token';
  private getMeetings = `https://api.zoom.us/v2/users/me/meetings`;
  private getMeetingById = (meetingId: string) =>
    `https://api.zoom.us/v2/meetings/${meetingId}`;
  private getEvents = 'https://api.zoom.us/zoom_events/events';

  private readonly logger = new Logger(ZoomService.name);
  private zoomOAuthToken: { token: string; expiresAt: number } | null = null;

  private async getZoomOAuthToken(): Promise<string> {
    const clientId = this.configService.get<string>('ZOOM_CLIENT_ID');
    const clientSecret = this.configService.get<string>('ZOOM_CLIENT_SECRET');
    const accountId = this.configService.get<string>('ZOOM_ACCOUNT_ID');

    if (!clientId || !clientSecret || !accountId) {
      this.logger.error('Missing Zoom credentials in environment variables');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (this.zoomOAuthToken && this.zoomOAuthToken.expiresAt > Date.now()) {
      this.logger.debug('Using cached Zoom OAuth token');
      return this.zoomOAuthToken.token;
    }

    try {
      const token = Buffer.from(`${clientId}:${clientSecret}`).toString(
        'base64',
      );
      const response = await axios.post(
        `${this.getAuth0Token}`,
        `grant_type=account_credentials&account_id=${accountId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const expiresIn = response.data.expires_in || 3600; // Default 1 hour
      this.zoomOAuthToken = {
        token: response.data.access_token,
        expiresAt: Date.now() + expiresIn * 1000,
      };

      this.logger.debug('Fetched new Zoom OAuth token');
      return response.data.access_token;
    } catch (error) {
      this.logger.error('Failed to fetch Zoom OAuth token', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to fetch Zoom OAuth token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async createZoomMeeting(createZoomMeetingDto?: CreateZoomMeetingDto) {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      this.logger.debug(
        'Creating Zoom meeting with payload:',
        createZoomMeetingDto,
      );

      const response = await axios.post(
        // zoomWebhooksApiPaths.meetings('me'),
        `https://api.zoom.us/v2/users/me/meetings`,
        createZoomMeetingDto,
        {
          headers: {
            Authorization: `Bearer ${zoomOAuthToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Zoom meeting created successfully: ${response.data.id}`);

      return response.data;
    } catch (error) {
      this.logger.error('Failed to create Zoom meeting', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to create Zoom meeting',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateZoomMeeting(meetingId: string, updateData: UpdateZoomMeetingDto) {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      this.logger.debug('Updating Zoom meeting with payload:', updateData);

      const response = await axios.patch(
        this.getMeetingById(meetingId),
        updateData,
        {
          headers: {
            Authorization: `Bearer ${zoomOAuthToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Zoom meeting updated successfully: ${response.data.id}`);

      return response.data;
    } catch (error) {
      this.logger.error('Failed to update Zoom meeting', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to update Zoom meeting',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getZoomMeetingById(meetingId: string) {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      this.logger.debug('Fetching Zoom meeting:', meetingId);

      const response = await axios.get(
        // zoomWebhooksApiPaths.meetings('me', meetingId),
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            Authorization: `Bearer ${zoomOAuthToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Zoom meeting fetched successfully: ${meetingId}`);

      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch Zoom meeting', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to fetch Zoom meeting',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getZoomMeetings() {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      this.logger.debug('Fetching all Zoom meetings');

      const response = await axios.get(this.getMeetings, {
        headers: {
          Authorization: `Bearer ${zoomOAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log('All Zoom meetings fetched successfully');

      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch all Zoom meetings', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to fetch all Zoom meetings',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteZoomMeeting(meetingId: string) {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      this.logger.debug('Deleting Zoom meeting:', meetingId);

      const response = await axios.delete(this.getMeetingById(meetingId), {
        headers: {
          Authorization: `Bearer ${zoomOAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Zoom meeting deleted successfully: ${meetingId}`);

      return response.data;
    } catch (error) {
      this.logger.error('Failed to delete Zoom meeting', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to delete Zoom meeting',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createZoomEvent() {
    // startTime?: string, // description?: string, // title?: string,
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();

      const eventData = {
        name: 'OpenAPI Conference Name',
        description: 'This event was created with the OpenAPI',
        timezone: 'America/Indianapolis',
        event_type: 'CONFERENCE',
        access_level: 'PRIVATE_RESTRICTED',
        status: 'PUBLISHED',
        hub_id: '23asdfasdf3asdf',
        attendance_type: 'hybrid',
        calendar: [
          {
            start_time: '2024-07-28T13:00:00Z',
            end_time: '2024-07-30T13:00:00Z',
          },
        ],
      };

      this.logger.debug('Creating Zoom event with payload:', eventData);

      const response = await axios.post(this.getEvents, eventData, {
        headers: {
          Authorization: `Bearer ${zoomOAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Zoom event created successfully: ${response.data.id}`);

      return {
        url: response.data.join_url,
        eventId: response.data.id,
      };
    } catch (error) {
      this.logger.error('Failed to create Zoom event', {
        message: error.message,
        response: error.response?.data,
      });
      throw new HttpException(
        'Failed to create Zoom event',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

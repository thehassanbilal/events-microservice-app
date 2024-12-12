import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZoomService {
  constructor(private readonly configService: ConfigService) {}

  private readonly zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings'; // Zoom API endpoint
  private readonly zoomOAuthTokenUrl = 'https://zoom.us/oauth/token'; // Zoom OAuth token endpoint
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
        `${this.zoomOAuthTokenUrl}`,
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

  async createZoomMeeting(
    topic?: string,
    duration?: number,
    timezone?: string,
    agenda?: string,
  ) {
    try {
      const zoomOAuthToken = await this.getZoomOAuthToken();
      console.log('here is zoomOAuthToken', zoomOAuthToken);

      const meetingData = {
        topic: topic || 'Virtual Event Meeting',
        agenda: agenda || 'Meeting agenda',
        type: 2, // Scheduled meeting
        start_time: new Date(
          new Date().getTime() + 5 * 60 * 1000,
        ).toISOString(), // Schedule 5 mins ahead
        duration: duration || 60, // Default to 60 minutes
        timezone: timezone || 'America/New_York',
      };

      this.logger.debug('Creating Zoom meeting with payload:', meetingData);

      const response = await axios.post(this.zoomApiUrl, meetingData, {
        headers: {
          Authorization: `Bearer ${zoomOAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Zoom meeting created successfully: ${response.data.id}`);

      return {
        url: response.data.join_url,
        meetingId: response.data.id,
        passcode: response.data.passcode,
      };
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
}

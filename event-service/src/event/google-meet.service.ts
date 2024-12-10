import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleMeetService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      'CLIENT_ID', // Replace with your Client ID
      'CLIENT_SECRET', // Replace with your Client Secret
      'REDIRECT_URI', // Replace with your Redirect URI
    );
    this.oauth2Client.setCredentials({ access_token: 'YOUR_ACCESS_TOKEN' }); // Replace with valid access token
  }

  async createGoogleMeet() {
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const event = {
      summary: 'Virtual Event Meeting',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: 'America/New_York',
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

    return {
      url: response.data.hangoutLink,
      meetingId: response.data.id,
      passcode: null, // Google Meet doesn't use passcodes
    };
  }
}

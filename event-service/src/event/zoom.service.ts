import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZoomService {
  private zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings'; // Zoom API endpoint
  private zoomOAuthToken = 'YOUR_ZOOM_OAUTH_TOKEN'; // Replace with actual OAuth token

  async createZoomMeeting() {
    const meetingData = {
      topic: 'Virtual Event Meeting',
      type: 2, // Scheduled meeting
      start_time: new Date().toISOString(),
      duration: 60, // Meeting duration
      timezone: 'America/New_York',
      agenda: 'Discuss event topics',
    };

    const response = await axios.post(this.zoomApiUrl, meetingData, {
      headers: {
        Authorization: `Bearer ${this.zoomOAuthToken}`,
      },
    });

    return {
      url: response.data.join_url,
      meetingId: response.data.id,
      passcode: response.data.passcode,
    };
  }
}

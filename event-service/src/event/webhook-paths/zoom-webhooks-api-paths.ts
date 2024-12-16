export const zoomWebhooksApiPaths = {
  getAuth0Token: 'https://zoom.us/oauth/token',
  meetings: (userId: string, meetingId?: string) =>
    `https://api.zoom.us/v2/users/${userId}/meetings${meetingId ?? `/${meetingId}`}`,
  events: 'https://api.zoom.us/zoom_events/events',
};

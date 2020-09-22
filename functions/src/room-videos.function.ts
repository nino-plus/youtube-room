import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { markEventTried, shouldEventRun } from './utils/should.function';
const db = admin.firestore();

export const roomVideos = functions.region('asia-northeast1')
  .firestore.document('rooms/{roomId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const channelId = data.id;
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        getMoviesByChannelId(channelId);
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

const { google } = require('googleapis');
google.options({
  method: 'GET',
  headers: {
    "Referer": "https://asia-northeast1-room-607dd.cloudfunctions.net/roomVideos"
  },
});
const apiKey = functions.config().youtube.api_key;
const youtube = google.youtube({ version: 'v3', auth: apiKey });

function getMoviesByChannelId(channelId: string) {
  youtube.search.list({
    part: 'snippet',
    channelId,
    maxResults: 49,
    order: `title`,
    type: `video`,
    safeSearch: 'none',
    videoCaption: 'any',
    videoDefinition: 'any',
    videoEmbeddable: 'any',
    videoLicense: 'any',
    videoSyndicated: 'any',
    videoType: 'any',
  }, (err: any, response: any) => {
    if (err) {
      functions.logger.info(err);
      return;
    }
    const resData: {
      "nextPageToken": string,
      "prevPageToken": string,
      "pageInfo": {
        "totalResults": number,
        "resultsPerPage": number
      },
      "items": []
    } = response.data;
    functions.logger.info(response.data);
    const items: any = resData.items;
    return createVideos(items, channelId);
  });
}

function createVideos(items: [], roomId: any) {
  const batch = db.batch();
  const notUsedNumbers: number[] = [...Array(items.length).keys()]
  items.forEach((item: any) => {
    const ramdomNumber = Math.floor(Math.random() * notUsedNumbers.length);
    notUsedNumbers.splice(ramdomNumber, 1);
    const randomId = ramdomNumber;
    const videoId = item.id.videoId;
    const snippet = item.snippet;
    const title = snippet.title;
    const img_url = snippet.thumbnails.high.url;
    const videoRef = db.doc(`rooms/${roomId}/videos/${randomId}`);
    batch.set(videoRef, {
      videoId,
      title,
      img_url,
      randomId,
    });
  });
  return batch.commit();
}

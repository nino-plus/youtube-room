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
        // tslint:disable-next-line: prefer-const
        let allVideosCount = 0;
        await getMoviesByChannelId(channelId, allVideosCount);
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

async function getMoviesByChannelId(channelId: string, allVideosCount: number, nextPageToken?: string) {
  youtube.search.list({
    part: 'snippet',
    channelId,
    maxResults: 50,
    order: `viewCount`,
    type: `video`,
    videoEmbeddable: true,
    videoSyndicated: true,
    pageToken: nextPageToken ? nextPageToken : '',
  })
    .then(async (response: any) => {
      const resData: {
        "nextPageToken": string,
        "items": []
      } = response.data;
      functions.logger.info(resData);
      const videos: [] = resData.items;
      // tslint:disable-next-line: no-parameter-reassignment
      allVideosCount += videos.length;
      await createVideos(videos, channelId, allVideosCount);
      await db.doc(`rooms/${channelId}`).update({ allVideosCount });
      await db.doc(`rooms/${channelId}`).update({ isCreating: false });
      const nextToken = response.data?.nextPageToken;
      functions.logger.info(nextToken);
      if (nextToken) {
        await getMoviesByChannelId(channelId, allVideosCount, nextToken);
      }
      return;
    })
    .catch((error: any) => {
      functions.logger.warn(error);
      return;
    });
}

async function createVideos(videos: [], roomId: string, allVideosCount: number) {
  const randomVideos = shuffleVideos(videos);
  const batch = db.batch();
  randomVideos.forEach(async (item: {
    "id": {
      "videoId": string,
    },
    "snippet": {
      "title": string,
      "thumbnails": {
        "high": {
          "url": string,
        }
      },
    },
  }) => {
    const videoId = item.id.videoId;
    const snippet = item.snippet;
    const title = snippet.title;
    const thumbnailURL = snippet.thumbnails.high.url;
    const random = Math.floor(Math.random() * allVideosCount);
    const videoRef = db.doc(`rooms/${roomId}/videos/${videoId}`);
    batch.set(videoRef, {
      videoId,
      title,
      thumbnailURL,
      random,
      isNowPlaying: false,
    });
  });
  return batch.commit();
}

function shuffleVideos(videos: []) {
  for (let i = videos.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [videos[i], videos[rand]] = [videos[rand], videos[i]];
  }
  return videos;
}

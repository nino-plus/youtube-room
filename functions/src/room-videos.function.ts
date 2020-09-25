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

function getMoviesByChannelId(channelId: string, nextPageToken?: string) {
  youtube.search.list({
    part: 'snippet',
    channelId,
    maxResults: 50,
    order: `viewCount`,
    type: `video`,
    pageToken: nextPageToken ? nextPageToken : '',
  })
    .then(async (response: any) => {
      const resData: {
        "nextPageToken": string,
        "pageInfo": {
          "totalResults": number,
        },
        "items": []
      } = response.data;
      functions.logger.info(resData);
      const videos: [] = resData.items;
      const allVideosCount: number = resData.pageInfo.totalResults;
      await createVideos(videos, channelId, allVideosCount);
      const nextToken = response.data?.nextPageToken;
      functions.logger.info(nextToken);
      if (nextToken) {
        getMoviesByChannelId(channelId, nextToken);
      }
      return;
    })
    .catch((error: any) => {
      functions.logger.warn(error);
      return;
    });
}

function createVideos(videos: [], roomId: string, allVideosCount: number) {
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
      allVideosCount
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

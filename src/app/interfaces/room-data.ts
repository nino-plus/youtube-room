export interface RoomData {
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    high: {
      url: string
    }
  };
}

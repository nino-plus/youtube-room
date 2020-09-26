export interface Room {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  allVideosCount: number;
  initialAction: boolean;
  isCreating: boolean;
}

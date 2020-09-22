import { firestore } from 'firebase';

export interface Message {
  uid: string;
  avatarId: number;
  createdAt: firestore.Timestamp;
  comments: string;
  userName: string;
}

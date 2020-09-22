import { firestore } from 'firebase';

export interface Message {
  uid: string;
  createdAt: firestore.Timestamp;
  comments: string;
  userName: string;
}

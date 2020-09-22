import { firestore } from 'firebase';

export interface Message {
  uid: string;
  comments: string;
  createdAt: firestore.Timestamp;
}

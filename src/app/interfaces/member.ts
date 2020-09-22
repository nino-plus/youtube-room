import { firestore } from 'firebase';

export interface Member {
  uid: string;
  active: true;
  lastStatsusCecked: firestore.Timestamp;
  lastPosted: firestore.Timestamp;
}

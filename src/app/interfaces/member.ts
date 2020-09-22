import { firestore } from 'firebase';

export interface Member {
  uid: string;
  active: true;
  lastStatusChecked: firestore.Timestamp;
  lastPosted: firestore.Timestamp;
}

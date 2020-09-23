import { NumberValueAccessor } from '@angular/forms';
import { firestore } from 'firebase';

export interface Member {
  uid: string;
  avatarId: number;
  active: true;
  lastStatusChecked: firestore.Timestamp;
  lastPosted: firestore.Timestamp;
  name: string;
}

import { NumberValueAccessor } from '@angular/forms';
import { firestore } from 'firebase';

export interface Member {
  uid: string;
  avatarId: number;
  isActive: boolean;
  lastStatusChecked: firestore.Timestamp;
  lastPosted: firestore.Timestamp;
  name: string;
}

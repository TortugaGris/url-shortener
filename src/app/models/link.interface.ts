import { Timestamp } from '@angular/fire/firestore';
import {z, ZodSchema} from 'zod';
import {DateTime} from 'luxon';

export interface Link {
  id: string;
  url: string;
  clicks: number;
  createdAt: DateTime;
  expiredAt: DateTime;
}

export const FirebaseTimestampSchema = z.instanceof(Timestamp);

export const LinkSchema: ZodSchema<Link, z.ZodTypeDef, unknown> = z.object({
  id: z.string(),
  url: z.string(),
  clicks: z.number(),
  createdAt: FirebaseTimestampSchema.transform((timestamp) => {
    return DateTime.fromMillis(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }),
  expiredAt: FirebaseTimestampSchema.transform((timestamp) => {
    return DateTime.fromMillis(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  })
})

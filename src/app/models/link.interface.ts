import {z, ZodSchema} from 'zod';

export interface Link {
  id: string;
  url: string;
}

export const LinkSchema: ZodSchema<Link, z.ZodTypeDef, unknown> = z.object({
  id: z.string(),
  url: z.string(),
})

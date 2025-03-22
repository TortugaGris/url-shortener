import {z} from "zod";

export const CreateShortLinkRequest = z.object({
  url: z.string(),
});

export const AddClickRequest = z.object({
  linkId: z.string(),
});

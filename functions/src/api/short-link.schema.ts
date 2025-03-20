import {z} from "zod";

export const CreateShortLinkRequest = z.object({
  url: z.string(),
});

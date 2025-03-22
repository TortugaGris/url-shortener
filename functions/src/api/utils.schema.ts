import {Request} from "express";
import {z, ZodType, ZodTypeDef} from "zod";

// Infers request type from Zod schema
export declare type TypedRequestBody<
  TBody extends ZodType<any, ZodTypeDef, any>
> = Request<any, any, z.infer<TBody>, any>;

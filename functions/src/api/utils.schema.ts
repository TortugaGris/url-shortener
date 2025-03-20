import {Request} from "express";
import {z, ZodType, ZodTypeDef} from "zod";

export declare type TypedRequestBody<
  TBody extends ZodType<any, ZodTypeDef, any>
> = Request<any, any, z.infer<TBody>, any>;

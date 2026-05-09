import { z } from "zod";

export function isRequiredField(
  schema: z.ZodObject<z.ZodRawShape>,
  fieldName: string,
): boolean {
  return !(schema.shape[fieldName] instanceof z.ZodOptional);
}

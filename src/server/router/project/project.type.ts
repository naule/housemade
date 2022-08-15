import * as z from "zod";

export const projectSchema = z.object({ id: z.string() });

export type IProjectcategory = z.infer<typeof projectSchema>;

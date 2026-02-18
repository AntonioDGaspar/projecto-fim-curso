import { z } from "zod";

export const createSalaSchema = z.object({
    nome: z.string().min(1, "Nome da sala é obrigatório"),
});

export const updateSalaSchema = z.object({
    nome: z.string().min(1, "Nome da sala é obrigatório"),
});

export type CreateSalaData = z.infer<typeof createSalaSchema>;
export type UpdateSalaData = z.infer<typeof updateSalaSchema>;

import { z } from "zod";

export const createTurmaSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    classeId: z.number().int().positive("Classe é obrigatória"),
    cursoId: z.number().int().positive("Curso é obrigatório"),
});

export const updateTurmaSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    classeId: z.number().int().positive("Classe é obrigatória").optional(),
    cursoId: z.number().int().positive("Curso é obrigatório").optional(),
}).refine((data) => data.nome || data.classeId || data.cursoId, {
    message: "Informe ao menos um campo para atualizar",
    path: ["nome"],
});

export type CreateTurmaData = z.infer<typeof createTurmaSchema>;
export type UpdateTurmaData = z.infer<typeof updateTurmaSchema>;

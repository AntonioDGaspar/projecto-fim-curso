import { z } from "zod";

export const baseCreateUserSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido").optional().nullable(),
    workosId: z.string().min(1, "WorkOS ID inválido").optional().nullable(),
    tipo: z.enum(["Admin", "Professor", "Aluno"]),
});

export const createAdminSchema = baseCreateUserSchema.extend({
    tipo: z.literal("Admin"),
});

export const createProfessorSchema = baseCreateUserSchema.extend({
    tipo: z.literal("Professor"),
    disciplinaIds: z.array(z.number().int().positive()).min(1, "O professor deve ter pelo menos uma disciplina"),
});

export const createAlunoSchema = baseCreateUserSchema.extend({
    tipo: z.literal("Aluno"),
    numMatricula: z.string().min(3, "Número de matrícula deve ter pelo menos 3 caracteres"),
});

export const createProfessorFormSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    disciplinaIds: z.array(z.number().int().positive()).min(1, "O professor deve ter pelo menos uma disciplina"),
});

export const updateProfessorSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").optional(),
    disciplinaIds: z.array(z.number().int().positive()).min(1, "O professor deve ter pelo menos uma disciplina").optional(),
}).refine((data) => data.nome || data.disciplinaIds, {
    message: "Informe ao menos um campo para atualizar",
    path: ["nome"],
});

export const updateAlunoSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").optional(),
    numMatricula: z.string().min(3, "Número de matrícula deve ter pelo menos 3 caracteres").optional(),
}).refine((data) => data.nome || data.numMatricula, {
    message: "Informe ao menos um campo para atualizar",
    path: ["nome"],
});

export type CreateUserData = z.infer<typeof baseCreateUserSchema>;
export type CreateAdminData = z.infer<typeof createAdminSchema>;
export type CreateProfessorData = z.infer<typeof createProfessorSchema>;
export type CreateAlunoData = z.infer<typeof createAlunoSchema>;
export type UpdateProfessorData = z.infer<typeof updateProfessorSchema>;
export type UpdateAlunoData = z.infer<typeof updateAlunoSchema>;

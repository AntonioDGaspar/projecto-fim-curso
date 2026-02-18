'use server'

import { professorService } from "@/lib/Service/Professores"
import { createProfessorFormSchema, createProfessorSchema, updateProfessorSchema } from "@/lib/Validation/Usuario"
import { z } from 'zod';
import { workos } from '@/lib/workos';
import { revalidatePath } from 'next/cache';
import { prisma } from "@/lib/prisma";


export type ActionResponse<T = any> = {
    success: boolean;
    data?: T | undefined;
    errors?: Record <string, string[] | undefined> | undefined;
    message?: string;
};

function parseDisciplinaIds(formData: FormData): number[] {
    const raw = formData.getAll('disciplinaIds');
    return raw.map(v => parseInt(String(v), 10)).filter(n => !isNaN(n));
}

export async function criarProfessor(
    formData: FormData
): Promise<ActionResponse> {
    try {
        // 1. Validação do formulário
        const nome = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const disciplinaIds = parseDisciplinaIds(formData);

        const formValidation = createProfessorFormSchema.safeParse({
            nome,
            email,
            disciplinaIds,
        });

        if (!formValidation.success) {
            return {
                success: false,
                errors: formValidation.error.flatten().fieldErrors,
                message: 'Erro de validação no formulário',
            };
        }

        // 2. WorkOS - Criar ou obter usuário (opcional)
        let workosId: string | undefined;

        // Só tenta criar no WorkOS se a API key estiver configurada
        if (process.env.WORKOS_API_KEY) {
            try {
                const workosUser = await workos.userManagement.createUser({
                    email,
                    firstName: nome.split(' ')[0] || nome,
                    lastName: nome.split(' ').slice(1).join(' ') || '',
                    emailVerified: false,
                });
                workosId = workosUser.id;

                // Enviar email de verificação (opcional)
                try {
                    await workos.userManagement.sendVerificationEmail({userId: workosUser.id});
                } catch (emailError) {
                    console.log('Email não enviado:', emailError);
                }
            } catch (error: any) {
                // Usuário já existe no WorkOS
                if (error.code === 'user_already_exists') {
                    const response = await workos.userManagement.listUsers({email});
                    workosId = response.data[0]?.id;
                } else {
                    // Log do erro mas continua sem WorkOS
                    console.warn('WorkOS error (continuing without):', error.message);
                }
            }
        }

        // 3. Preparar dados para o Service
        const professorData = {
            nome,
            email,
            workosId,
            tipo: 'Professor' as const,
            disciplinaIds,
        };

        // 4. Validar pelo schema central e usar o service
        const validatedData = createProfessorSchema.parse(professorData);
        const professor = await professorService.criarProfessor(validatedData);

        // 5. Revalidar cache
        revalidatePath('/professores');

        return {
            success: true,
            data: professor,
            message: 'Professor criado com sucesso!'
        };

    } catch (error: any) {
        console.error('Erro ao criar professor:', error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors || undefined,
                message: 'Erro de validação',
            };
        }

        return {
            success: false,
            message: error.message || 'Erro inesperado',
        };
    }
}

export async function criarProfessorAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    return await criarProfessor(formData);
}

export async function atualizarProfessor(
    id: number,
    formData: FormData
):Promise<ActionResponse>{
    try {
        const nome = formData.get('nome') as string | null;
        const disciplinaIds = parseDisciplinaIds(formData);

        const validateData = updateProfessorSchema.parse({
            nome: nome || undefined,
            disciplinaIds: disciplinaIds.length > 0 ? disciplinaIds : undefined,
        });
        const professor = await professorService.atualizarProfessor(id, validateData)
        revalidatePath('/professores');
        return{
            success: true, data: professor, message: 'Professor atualizado com sucesso',
        };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors || undefined,
                message: 'Erro de validação',
            };
        }

        return { success: false, message: error.message || 'Erro inesperado' };
    }
}
export async function apagarProfessor(id:number): Promise<ActionResponse> {
    try {
        const professor = await professorService.showProfessor(id);

        if (professor?.workos_id) {
            try {
                await workos.userManagement.deleteUser(professor.workos_id);
            } catch (error) {

            }
        }
        const result = await professorService.apagarProfessor(id);
        revalidatePath('/professores');
        return{ success: true, data: result, message: 'Professor apagado com sucesso'};


    } catch (error: any) {
        return{ success: false, message: error.message}
    }

}

export async function listarTodos() {
    return await professorService.listarTodos();
}

export async function showProfessor(id:number) {
    try {
        return await professorService.showProfessor(id);
    } catch (error) {
        return null;
    }
}

export async function listarDisciplinas() {
    return await prisma.disciplina.findMany({
        orderBy: { nome: 'asc' }
    });
}

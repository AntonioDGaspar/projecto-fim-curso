import { prisma } from '@/lib/prisma';
import { CreateDisciplinaData, UpdateDisciplinaData } from '@/lib/Validation/Disciplina';

export class DisciplinaCRUD {
    async criar(data: CreateDisciplinaData) {
        return await prisma.disciplina.create({ data });
    }

    async atualizar(id: number, data: UpdateDisciplinaData) {
        return await prisma.disciplina.update({
            where: { idDisciplina: id },
            data,
        });
    }

    async mostrar(id: number) {
        return await prisma.disciplina.findUnique({
            where: { idDisciplina: id },
        });
    }

    async listarTodas() {
        return await prisma.disciplina.findMany({
            orderBy: { nome: 'asc' },
        });
    }

    async apagar(id: number) {
        await prisma.disciplina.delete({
            where: { idDisciplina: id },
        });
        return { message: "Disciplina eliminada com sucesso" };
    }
}

export const disciplinaService = new DisciplinaCRUD();

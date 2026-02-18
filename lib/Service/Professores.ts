import { prisma } from "../prisma";
import { CreateProfessorData, UpdateProfessorData } from "@/lib/Validation/Usuario";

const professorInclude = {
    Professor: {
        include: {
            ProfDisciplinas: {
                include: { Disciplina: true }
            }
        }
    }
} as const;

export class ProfessorCRUD{
    async criarProfessor(data: CreateProfessorData){
        if (data.workosId) {
            const existente = await prisma.utilizador.findUnique({
                where:{workos_id: data.workosId}
            })
            if (existente) {
                throw new Error("Usuário com este WorkOS ID já existe");
            }
        }
        if(data.tipo !== 'Professor'){
            throw new Error("Tipo de usuário inválido");
        }
        return await prisma.utilizador.create({
            data:{
                nome: data.nome,
                workos_id: data.workosId,
                email: data.email,
                tipo: "Professor",
                updated_at: new Date(),
                Professor:{
                    create:{
                        updated_at: new Date(),
                        ProfDisciplinas: {
                            create: data.disciplinaIds.map(id => ({
                                disciplinaId: id,
                            })),
                        },
                    },
                },
            },
            include: professorInclude,
        })

    }

    async atualizarProfessor(id: number, data: UpdateProfessorData){
        const existente = await prisma.utilizador.findUnique({
            where: {id},
            include:{Professor: true},
        })
        if(!existente || existente.tipo !== 'Professor' || !existente.Professor){
            throw new Error("Professor não encontrado");
        }

        if (data.disciplinaIds) {
            await prisma.profDisciplinas.deleteMany({
                where: { professorId: existente.Professor.id_professor }
            });
            await prisma.profDisciplinas.createMany({
                data: data.disciplinaIds.map(id => ({
                    professorId: existente.Professor!.id_professor,
                    disciplinaId: id,
                })),
            });
        }

        return await prisma.utilizador.update({
            where:{id},
            data:{
                nome: data.nome ?? undefined,
                updated_at: new Date(),
            },
            include: professorInclude,
        })
    }

    async showProfessor (id: number){
        return await prisma.utilizador.findUnique({
            where: {id},
            include: professorInclude,
        })
    }

    async listarTodos(){
        return prisma.professor.findMany({
            include: {
                Utilizador: {
                    select:{
                        id: true,
                        nome: true,
                        tipo: true,
                        email: true,
                        workos_id: true,
                    }
                },
                ProfDisciplinas: {
                    include: { Disciplina: true }
                }
            }
        })
    }

    async apagarProfessor(id: number){
        const utilizador = await prisma.utilizador.findUnique({
            where: {id},
            include: {Professor: true}
        })
        if(!utilizador || utilizador.tipo !== 'Professor' || !utilizador.Professor){
            throw new Error("Professor não encontrado");
        }

        await prisma.profDisciplinas.deleteMany({
            where: { professorId: utilizador.Professor.id_professor }
        })
        await prisma.professor.delete({where: {id_professor: utilizador.Professor.id_professor}})
        await prisma.utilizador.delete({where: {id}})

        return {message: "Professor eliminado com sucesso"}
    }

}
export const professorService = new ProfessorCRUD();

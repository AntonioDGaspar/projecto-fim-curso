import Image from "next/image";  
import { Check } from "lucide-react";

export function Sobre() {
    return (
        <section className="bg-orange-300 py-16 ">
        <div className="container px-4 mx-auto ">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">

            {/*<div className="relative w-full h-[400px] rounded-3xl overflow-hidden ">
                <Image src={logoImg} alt="Logo do Instituto Kena"
                fill
                quality={100}
                priority
                className=" object-cover hover:scale-110 duration-300"/>
            </div>*


             <div className="absolute w-40 h-40 right-4 -bottom-8 border-4 overflow-hidden rounded-lg">
                <Image src={logo} alt="Logo do Instituto Kena"
                fill
                quality={100}
                priority
                />
                
            </div>*/}
            </div>


            <div className="space-y-6 mt-10">
                <h2 className="text-4xl font-bold">SOBRE</h2>
                <p> 
                O Instituto Kena é uma instituição de ensino dedicada a proporcionar uma educação de qualidade e formar cidadãos preparados para os desafios do futuro. Com uma equipe de educadores experientes e um ambiente acolhedor, o Instituto Kena oferece uma ampla gama de programas acadêmicos e atividades extracurriculares para promover o desenvolvimento integral dos alunos.
                </p>
                <ul className="space-y-4 ">
                    <li className="flex items-center gap-3">
                        <Check className="text-red-800"></Check>
                        Ensino de Excelência
                    </li>
                    <li className="flex items-center gap-3">
                        <Check className="text-red-800"></Check>
                        Corpo Docente Qualificado
                    </li>
                    <li className="flex items-center gap-3">
                        <Check className="text-red-800"></Check>
                        Infraestrutura Moderna
                    </li>
                    <li className="flex items-center gap-3">
                        <Check className="text-red-800"></Check>
                        Atividades Extracurriculares
                    </li>
                </ul>
            </div>
            </div>
        </div>
        </section>
    )
}

      
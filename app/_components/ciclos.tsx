"use client";
import useEmblaCarousel from 'embla-carousel-react' 
import { ChevronLeft, ChevronRight, Book, icons, Clock} from 'lucide-react'

const ciclosData = [
    {
        title: 'Primeiro Ciclo',
        description: 'Ensino Primário da 1ª à 6ª classe, focando no desenvolvimento básico de habilidades acadêmicas e sociais.',
        icons: <Book />,
        period: 'Período da manhã',
    },
    {
        title: 'Segundo Ciclo',
        description: 'Da 7ª à 9ª classe, preparando os nossos alunos para o ensino secundário com uma base sólida em diversas disciplinas. ',
        icons: <Book />,
        period: 'Período da manhã',
    },
    {
        title: 'Ensino Médio',
        description: 'Da 10ª à 12ª classe ( 13ª para cursos técnicos), oferecendo uma educação abrangente que prepara os alunos para o ensino superior e para o mercado de trabalho.',
        icons: <Book />,
        period: 'Período da híbrido',
    },
    
];


export function Ciclos () {
    const [emblaref, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': {
                slidesToScroll: 3,},},
    });

    function scrollPrev() {
       emblaApi?.scrollPrev();
    }
    function scrollNext() {
       emblaApi?.scrollNext();
    }

    return (
        <section className="bg-white py-16 ">
            <div className="container mx-auto px-4">
                <div>
                    <h2 className="font-4xl font-bold mb-12">Ciclos</h2>

                  <div className="relative">

                    <div className='overflow-hidden' ref={emblaref}>
                        <div className='flex'>
                            {ciclosData.map((items,index) => (
                                <div key={index} className='flex-[_0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3'> 
                                <article className='bg-red-900 text-white rounded-2xl p-6 space-y-4 h-full flex flex-col'>
                                    <div className='flex-1 flex items-start justify-between' >


                                        <div className='flex gap-4'>
                                            <span className='text-3xl '>
                                                {items.icons}
                                            </span>
                                            <div>
                                                <h3 className='font-bold text-xl my-1'>
                                                    {items.title}
                                                </h3>
                                                <p className='text-gray-300 text-sm select-none'>
                                                    {items.description}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='border-t border-gray-200 pt-4 flex items-center justify-between '>
                                        <div className='flex items-center gap-2 text-sm '>
                                            <Clock className='w-4 h-4'/>
                                            <span>
                                                {items.period}
                                            </span>
                                        </div>

                                        <a href=''></a>


                                    </div>


                                </article>
                                </div>
                            ))}
                    </div>
                    
                    <button className=' bg-amber-600 flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute left-1 -translate-y-1/2 -tranaslate-x-1/2 top-1/2 z-10'
                     onClick={scrollPrev}>
                        <ChevronLeft
                        className='w-6 h h-6 text-gray-200' />
                    </button>

                     <button className=' bg-amber-600 flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute right-0 -translate-y-1/2 -tranaslate-x-1/2 top-1/2 z-10'
                     onClick={scrollNext}>
                        <ChevronRight
                        className='w-6 h h-6 text-gray-200' />
                    </button>


                  </div>
                </div>


                
            </div>
            </div>
        </section>
    )
};
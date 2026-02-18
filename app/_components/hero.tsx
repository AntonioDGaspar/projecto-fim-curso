import Image from 'next/image';


export function Hero() {
    return (
        <section className="bg-gray-200 p-8 overflow-hidden"> 
        
        {/*<div>
            <Image src={heroEscolaimg}
            alt='foto da escola'
            fill
            sizes='100vw'
            className='object-cover opacity-60 lg:hidden'/>
        </div> */}

        <div className='absolute inset-0 bg-black opacity-40 md:hidden'> dfd</div>

         <div className="container mx-auto pt-16 pb-16 md:pb-0 px-4 relative">

            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-10" >
                       O Futuro do seu filho começa aqui 
                    </h1>
                    <p className="lg:text-lg"> o melhor ensino da provìncia do Huambo encontra-se aquino instituto Kena</p>
                    <div>
                    <a href="#"className="bg-gray-500 px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit">login</a>
                    </div>
                    <div className="mt-8">
                        <p >Venha fazer parte da nossa família!</p>
                    </div>
                </div>


                {/*<div className="hidden md:block h-full relative" >
                    <Image src={heroEscolaimg} alt="Imagem da Escola" className="object-contain h-full w-full rounded-lg shadow-lg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    quality={100}
                    priority
                    /> {/* Ajustar depois o fill e o sizes se necessário *
                  
                </div>}*/}

            </article>

        </div>
        </section>
    );
}
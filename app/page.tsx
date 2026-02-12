export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                ScheduleGen
            </h1>
            <p className="mt-3 text-2xl text-white sm:mt-5 sm:text-3xl">
                Sistema de Geração de Horários Escolares
            </p>
            <a className="text-white" href="/login"> Login </a>
        </div>
    )
}
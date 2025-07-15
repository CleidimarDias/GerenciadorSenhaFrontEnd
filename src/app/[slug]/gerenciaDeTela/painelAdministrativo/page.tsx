
import FormularioCriarLocalDeAtendimento from '@/app/myComponents/formularioCriarLocalDeAtendimento';
import FormularioCriarServicosOferecidos from '@/app/myComponents/formularioCriarServicosOferecidos';
import FormularioCriarUsuario from '@/app/myComponents/formularioCriarUsuario';
import PrivateRoute from '@/app/myComponents/privateRoute';
import { Separator } from '@/components/ui/separator';
// import { Separator } from '@/components/ui/separator';
import { SquareChartGantt } from 'lucide-react';
import Link from 'next/link';


interface slugProps {
    params: Promise<{ slug: string }>;
}

export default async function PainelAdminstrativo({ params }: slugProps) {

    const { slug } = await params;
    console.log(slug)


    return (
        <PrivateRoute>

            <div className="flex justify-between md:justify-around p-10  md:text-3xl  font-light   bg-white  border-white mb-6 md:mb-0">
                <h3 className="text-[#1270b7]">{slug.toUpperCase()}</h3>
                {/* <h3 className="text-[#1270b7] hidden md:block">Triagem</h3> */}

                <Link
                    href={`/${slug}/gerenciaDeTela`}
                    className="flex gap-4 items-center "
                >
                    <SquareChartGantt
                        size={30}
                        strokeWidth={1}
                        className="text-[#1270b7]  "
                    />
                    <p className="text-[#1270b7]"> Ir para Telas de Acesso</p>
                </Link>
            </div>

            <div className=" h-full w-screen">
                <p className="text-2xl lg:text-4xl  my-12 mx-auto w-fit text-[#1270b7]  ">Painel Administrativo</p>

                <div className="   flex my-8 flex-col  gap-12 justify-around   items-center border-1 border-gray-200 ">
                    <FormularioCriarUsuario slug={slug} />
                    <Separator />
                    <FormularioCriarServicosOferecidos slug={slug} />
                    <Separator />
                    <FormularioCriarLocalDeAtendimento slug={slug} />

                </div>
            </div>
        </PrivateRoute>

    )
}

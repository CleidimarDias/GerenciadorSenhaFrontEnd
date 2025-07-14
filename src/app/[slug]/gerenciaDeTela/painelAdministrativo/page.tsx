
import FormularioCriarLocalDeAtendimento from '@/app/myComponents/formularioCriarLocalDeAtendimento';
import FormularioCriarUsuario from '@/app/myComponents/formularioCriarUsuario';
import PrivateRoute from '@/app/myComponents/privateRoute';
import { Separator } from '@/components/ui/separator';
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
                <div className="  m-8 flex flex-col lg:flex-row gap-4 justify-around  h-[calc(100vh-6.25rem)] items-center border-1 border-gray-200 ">
                    <FormularioCriarUsuario slug={slug} />
                    <Separator orientation='vertical' className='hidden lg:block' />
                    <FormularioCriarLocalDeAtendimento slug={slug} />
                </div>
            </div>
        </PrivateRoute>

    )
}

import ComponenteEscolhaGuiche from "@/app/myComponents/compnentsGuiche/compnenteGuicheAtendimento";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getReparticao } from "@/data/get-reparticao";
import { SquareChartGantt } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
// import { getReparticao } from "@/data/get-reparticao";
// import React from "react";

interface slugProps {
  params: Promise<{ slug: string }>;
}

interface reparticaoProps {
  name: string;
  id: string;
}

// interface guicheProps {
//   name: string;
//   id: string;
// }
export default async function GuicheDeAtendimento({ params }: slugProps) {
  const { slug } = await params;
  console.log(slug);

  const reparticao: reparticaoProps = await getReparticao(slug);

  if (!reparticao) {
    notFound();
  }

  const reparticaoId = reparticao.id;

  return (
    // <div className="flex flex-col  my-8 gap-8 w-screen bg-red-400  ">
    //   <div className="flex justify-between text-2xl opacity-60 max-w-screen  px-12  ">
    //     <p>Guichê de Atendimento</p>
    //     <p>{slug.toUpperCase()}</p>
    //   </div>
    //   <ComponenteEscolhaGuiche reparticaoId={reparticaoId} />
    // </div>

    <div className=" w-screen  mb-5">
      <div className="flex justify-between md:justify-around p-10  md:text-3xl  font-light   bg-white  border-white mb-6 md:mb-0">
        <h3 className="text-[#1270b7]">{slug.toUpperCase()}</h3>
        <h3 className="text-[#1270b7] hidden md:block">
          Guichê de Atendimento
        </h3>

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

      <ComponenteEscolhaGuiche reparticaoId={reparticaoId} />
    </div>
  );
}

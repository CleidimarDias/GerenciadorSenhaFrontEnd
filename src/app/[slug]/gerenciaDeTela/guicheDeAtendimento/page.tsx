import ComponenteEscolhaGuiche from "@/app/myComponents/compnentsGuiche/compnenteGuicheAtendimento";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getReparticao } from "@/data/get-reparticao";

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
    <div className="flex flex-col min-h-screen my-8 gap-8    ">
      <div className="flex justify-between text-2xl opacity-60 max-w-screen  px-12  ">
        <p>Guichê de Atendimento</p>
        <p>{slug.toUpperCase()}</p>
      </div>

      <ComponenteEscolhaGuiche reparticaoId={reparticaoId} />
    </div>
  );
}

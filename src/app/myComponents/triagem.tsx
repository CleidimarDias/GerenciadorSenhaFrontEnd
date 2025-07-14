"use client";

import { getReparticao } from "@/data/get-reparticao";
import { getAllServicos } from "@/data/getAllServicos";
import { CategoriaServico } from "@/types/typesServicos";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormularioCidadaoGerarSenha } from "./formularioCidadaoGerarSenha";
import { getAllSenhas } from "@/data/getAllSenhas";
import { SquareChartGantt } from "lucide-react";
import Link from "next/link";


interface TriagemProps {
  slug: string;
}

interface ReparticaoProps {
  name: string;
  id: string;
}

interface QuantidadePorServico {
  id: string;
  nome: string;
  quantidade: number;
}

export default function Triagem({ slug }: TriagemProps) {
  const [reparticao, setReparticao] = useState<ReparticaoProps | null>(null);
  const [servicosData, setServicosData] = useState<CategoriaServico[]>([]);
  const [quantidadeDeSenhasPorServico, setQuantidadeDeSenhasPorServico] =
    useState<QuantidadePorServico[]>([]);

  // Carrega dados fixos uma vez
  useEffect(() => {
    const fetchInitialData = async () => {
      const rep = await getReparticao(slug);
      if (!rep) return;
      setReparticao(rep);

      const servicos = await getAllServicos(rep.id);
      setServicosData(servicos);

      // Atualiza quantidade de senhas ao carregar
      atualizarQuantidadeDeSenhas(servicos);
    };

    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Atualiza só as senhas pendentes a cada 5s
  const atualizarQuantidadeDeSenhas = async (
    servicos: CategoriaServico[] = servicosData
  ) => {
    const todasSenhas = await Promise.all(
      servicos.map((s) => getAllSenhas(s.id))
    );

    const quantidades = servicos.map((s, index) => ({
      id: s.id,
      nome: s.name,
      quantidade: todasSenhas[index]?.length || 0,
    }));

    setQuantidadeDeSenhasPorServico(quantidades);
  };

  // const atualizarQuantidadeDeSenhas = async (
  //   servicos: CategoriaServico[] = servicosData
  // ) => {
  //   const todasSenhas = await Promise.all(
  //     servicos.map((s) => getPeendingSenhas(s.id))
  //   );

  //   const quantidades = servicos.map((s, index) => ({
  //     id: s.id,
  //     nome: s.name,
  //     quantidade: todasSenhas[index]?.length || 0,
  //   }));

  //   setQuantidadeDeSenhasPorServico(quantidades);
  // };

  if (!reparticao) return <p>Carregando...</p>;
  return (
    <div className="   md:h-[calc(100vh-6.25rem)] md:flex md:flex-col  md:justify-around ">
      <div className="flex justify-between md:justify-around p-10  md:text-3xl  font-light   bg-white  border-white mb-6 md:mb-0">
        <h3 className="text-[#1270b7]">{slug.toUpperCase()}</h3>
        <h3 className="text-[#1270b7] hidden md:block">Triagem</h3>

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

      <div className=" flex items-center justify-center  mx-4 mb-8 rounded-2xl  flex-1 ">
        <div className="md:grid md:grid-cols-4 gap-10 w-full mx-8 flex flex-col">
          {quantidadeDeSenhasPorServico.map((servico) => (
            <div key={servico.id} className="h-full w-full">
              <Card className=" text-center text-xl md:text-2xl w-full py-10 bg-[#1270b7] text-white border-[#1270b7] shadow-xl/60 shadow-[#1270b7] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-800 ">
                <CardHeader>{servico.nome}</CardHeader>
                <CardContent>
                  {/* <p className="mb-4 text-base text-white">
                    Total: {servico.quantidade}
                  </p> */}
                  <Dialog >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className=" text-slate-900  hover:text-zinc-950 border-[#1270b7]  hover:border-2 hover:border-sky-900 text-xl"
                      >
                        Criar senha
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Cidadão</DialogTitle>
                        <DialogDescription>
                          Preencha os dados do cidadão
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="items-center gap-4">
                          <FormularioCidadaoGerarSenha
                            reparticaoId={reparticao.id}
                            servicoId={servico.id}
                            onSenhaCriada={() => atualizarQuantidadeDeSenhas()}
                          />
                        </div>

                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

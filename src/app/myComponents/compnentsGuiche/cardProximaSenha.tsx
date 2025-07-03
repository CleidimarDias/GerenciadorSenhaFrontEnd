"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useGuiche } from "@/app/contexts/guicheContext";
import { GetNextSenha } from "@/data/getNextSenha";

import { getAllServicos } from "@/data/getAllServicos";
import { getPeendingSenhas } from "@/data/getAllPeendingSenhas";
import { UsetotalSenhas } from "@/app/contexts/totalSenhasContext";

interface CardProxmaSenhaProps {
  servicoName: string;
  reparticaoId: string;
  servicoId: string;
  userId: string;
}

interface ServicosProps {
  id: string;
  name: string;
  slug: string;
}

// interface IsenhaProps {
//   id: string;
//   senha: string;
//   total: number

// }

interface QuantidadePorServico {
  id: string;
  nome: string;
  quantidade: number;
}

// interface IproxmaSenhaProps {
//   servicos?: CardProxmaSenhaProps[]
// }
export default function CardProximaSenha({
  servicoName,
  servicoId,
  userId,
  reparticaoId,
}: CardProxmaSenhaProps) {
  const { guiche } = useGuiche();
  const { settotalSenhas } = UsetotalSenhas();

  // const data: string[] = [
  //   servicoId,
  //   userId,
  //   reparticaoId,
  //   guiche?.id as string,
  // ];

  const [servicosData, setServicosData] = useState<ServicosProps[] | null>(
    null
  );
  // const [senhasPorServico, setSenhasPorServico] = useState<
  //   IsenhaProps[] | null
  // >(null);

  const [
    quantidadeDeSenhasPendentePorServico,
    setQuantidadeDeSenhasDeSenhasPendentePorServico,
  ] = useState<QuantidadePorServico[]>([]);

  useEffect(() => {
    const getServicos = async () => {
      const resp = await getAllServicos(reparticaoId);
      setServicosData(resp);
    };
    getServicos();
  }, [reparticaoId]);

  console.log("Servicos data vindo do card proxima senha: ", servicosData);

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

  const atualizaTotalSenha = async () => {
    if (!servicosData) {
      console.error("ServicosData não está definido");
      return;
    }

    try {
      const total = await Promise.all(
        servicosData.map((servico) => getPeendingSenhas(servico.id))
      );

      const quantidade = servicosData.map((servico, index) => ({
        id: servico.id,
        nome: servico.name,
        quantidade: total[index].length || 0,
      }));
      setQuantidadeDeSenhasDeSenhasPendentePorServico(quantidade);
      settotalSenhas(quantidade.map((q) => q.quantidade));
    } catch (error) {
      console.error("Erro ao Pegar todas as senhas", error);
    }
  };

  //console.log("Quantidade vindo do useTotal", totalSenhas);

  // console.log(
  //   "Senhas por serviço vindo do cardProximaSEnha: ",
  //   senhasPorServico
  // );
  // console.log("pedding Senhas vindo do card Proxima senha: ", peddingSenhas);

  const guicheId = guiche?.id as string;
  const handleNextSenha = async () => {
    const res = await GetNextSenha({
      servicoId,
      userId,
      reparticaoId,
      guicheId,
    });

    if (!res) {
      throw new Error("Erro ao tentar chamar próxima senha");
    }

    atualizaTotalSenha();
    return res;
  };

  console.log(
    quantidadeDeSenhasPendentePorServico.map(
      (quantidade) => quantidade.quantidade
    )
  );

  console.log(
    quantidadeDeSenhasPendentePorServico.map((quantidade) => quantidade.nome)
  );

  return (
    <Card className="w-[280px] shadow-[#1270b7] mx-auto gap-10">
      <CardHeader className="">
        <CardTitle className="text-center text-xl">{servicoName}</CardTitle>
        <CardDescription>
          Senhas Pendentes:{" "}
          {quantidadeDeSenhasPendentePorServico.map(
            (quantidade) => quantidade.quantidade
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className=" ">
        <Button
          onClick={handleNextSenha}
          className="bg-[#1270b7] w-full text-xl p-6"
        >
          Chamar Próxima Senha
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-[#28945e]">Finalizar</Button>
        <Button variant="destructive">Cancelar</Button>
      </CardFooter>
    </Card>
  );
}

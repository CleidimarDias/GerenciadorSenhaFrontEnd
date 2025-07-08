"use client";

import { getAllGuiches } from "@/data/getAllGuiches";
import { BackendResponseGuicheProps } from "@/types/typeGhiche";

import React, { useEffect, useState } from "react";

import CardEscolhaGuiche from "./cardEscolhaGuiche";
import { getAllServicos } from "@/data/getAllServicos";
import { useUser } from "@/app/contexts/AuthContext";
import CardProximaSenha from "./cardProximaSenha";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

//import CardProximaSenha from "./cardProximaSenha";

interface reparticaoProps {
  reparticaoId: string;
}

interface servicosProps {
  name: string;
  slug: string;
  id: string;
}

export default function ComponenteGuicheAtendimento({
  reparticaoId,
}: reparticaoProps) {
  const [guiches, setGuiches] = useState<BackendResponseGuicheProps[0] | null>(
    null
  );

  const [allServicos, setAllServicos] = useState<servicosProps[] | null>(null);

  const { user } = useUser();

  console.log("id do usuário: ", user?.UserLogin.id);

  useEffect(() => {
    const getServicos = async () => {
      const res: servicosProps[] = await getAllServicos(reparticaoId);
      setAllServicos(res);
    };
    getServicos();
  }, [reparticaoId]);

  allServicos?.map((servico) => console.log("Servicos", servico.name));

  useEffect(() => {
    const getGuiches = async () => {
      const res: BackendResponseGuicheProps = await getAllGuiches(reparticaoId);
      setGuiches(res[0]);
    };
    getGuiches();
  }, [reparticaoId]);

  guiches?.guiches.map((guiche) => console.log(guiche.name));

  const frameworks = guiches?.guiches.map((guiche) => ({
    value: guiche.id,
    label: guiche.name,
  }));

  //  reparticaoId, servicoId, guicheId, usuarioId
  // [x] servicoId
  // [x] guicheId
  // [x] ReparticaoId

  return (
    <div className="flex  flex-col  gap-10 items-center justify-center  mt-5 ">
      <CardEscolhaGuiche frameworks={frameworks} />
      <Separator orientation="horizontal" />
      <Card>
        <CardContent>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-12  mx-auto my-auto items-center flex flex-col">
            {allServicos?.map((servico) => (
              <CardProximaSenha
                key={servico.id}
                servicoName={servico.name}
                servicoId={servico.id}
                reparticaoId={reparticaoId}
                userId={user ? user?.UserLogin.id : ""}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

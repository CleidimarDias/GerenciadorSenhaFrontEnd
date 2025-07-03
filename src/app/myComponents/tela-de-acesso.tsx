import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReparticãoProps {
  reparticaoName: string;

  slug: string;
}

export default function TelaDeAcesso({
  reparticaoName,
  slug,
}: ReparticãoProps) {
  return (
    <div>
      <Card className="w-xl">
        <CardHeader className="text-3xl ">
          <CardTitle className="mx-auto">Telas de Acesso</CardTitle>
          <CardDescription className="mx-auto">
            Telas disponíveis para acesso
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3  ">
          <Button className="bg-[#1270b7]  hover:bg-blue-700 p-6 text-xl ">
            <Link href={`/${slug}/gerenciaDeTela/triagem`}>Triagem</Link>
          </Button>
          <Button className="bg-[#1270b7]  hover:bg-blue-700 p-6 text-xl">
            <Link href={`/${slug}/gerenciaDeTela/guicheDeAtendimento`}>
              Guichê de Atendimento
            </Link>
          </Button>
          <Button className="bg-[#1270b7]  hover:bg-blue-700 p-6 text-xl">
            <Link href={`/${slug}/gerenciaDeTela/monitor`}>Monitor </Link>
          </Button>
          <Button className="bg-[#1270b7]  hover:bg-blue-700 p-6 text-xl">
            {" "}
            Painel Administrativo
          </Button>
        </CardContent>
        <CardFooter className="text-2xl font-semibold  opacity-60 ">
          {reparticaoName}
        </CardFooter>
      </Card>
    </div>
  );
}

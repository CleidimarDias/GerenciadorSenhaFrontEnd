import PrivateRoute from "@/app/myComponents/privateRoute";
import TelaDeAcesso from "@/app/myComponents/tela-de-acesso";
import { getReparticao } from "@/data/get-reparticao";
import { notFound } from "next/navigation";
//import PrivateRoute from "@/app/myComponents/privateRoute";
import React from "react";

interface slugProps {
  params: Promise<{ slug: string }>;
}

interface ReparticaoProps {
  name: string;
  id: string;
}

export default async function GerenciaDeTela({ params }: slugProps) {
  const { slug } = await params;

  const reparticao: ReparticaoProps = await getReparticao(slug);

  if (!reparticao) {
    notFound();
  }
  const reparticaoName = reparticao.name;

  return (
    <PrivateRoute>
      <div className=" flex justify-center items-center md:w-screen  h-[calc(100vh-6.25rem)]">
        <TelaDeAcesso reparticaoName={reparticaoName} slug={slug} />
      </div>
    </PrivateRoute>
  );
}

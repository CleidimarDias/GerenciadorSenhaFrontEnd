import FormularioLogin from "@/app/myComponents/formulario-login";
import { getReparticao } from "@/data/get-reparticao";
import { notFound } from "next/navigation";
import React from "react";

interface LoginProps {
  params: Promise<{ slug: string }>;
}

interface ReparticãoProps {
  id: string;
  name: string;
}

export default async function Login({ params }: LoginProps) {
  const { slug } = await params;

  const reparticao: ReparticãoProps = await getReparticao(slug);

  if (!reparticao) {
    notFound();
  }

  console.log("Name", reparticao.name);

  console.log(slug);
  return (
    <div className="flex justify-center items-center h-screen">
      <FormularioLogin slug={slug} />
    </div>
  );
}

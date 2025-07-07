import FormularioLogin from "@/app/myComponents/formulario-login";
import { Card, CardContent } from "@/components/ui/card";
import { getReparticao } from "@/data/get-reparticao";
import Image from "next/image";
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
    <div className="  flex justify-center items-center h-[calc(100vh-6.25rem)] mx-2">
      <Card className=" flex items-center justify-center mx-4    ">
        <CardContent>
          <div className="flex bg-[#1270b7] items-center   ">
            <div className=" flex-1 hidden md:block ">
              <Image
                src="/logo-prefeitura.png"
                alt="Logo"
                width={600}
                height={600}
                className=" mx-auto "
              />
            </div>

            <FormularioLogin slug={slug} />
          </div>
        </CardContent>
      </Card>
    </div>

    // <div className="   h-[calc(100vh-6.25rem)] flex items-center justify-center md:justify-between bg-amber-400 w-screen">
    //   <Image
    //     src="/logo-prefeitura.png"
    //     alt="Logo"
    //     width={600}
    //     height={600}
    //     className="bg-green-400 md:block hidden"
    //   />
    //   <FormularioLogin slug={slug} />
    // </div>
  );
}

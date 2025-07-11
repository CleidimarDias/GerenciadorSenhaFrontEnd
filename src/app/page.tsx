"use client";

import Image from "next/image";
import { useUser } from "./contexts/AuthContext";

import { Button } from "@/components/ui/button";
import Link from "next/link";
//import { Separator } from "@/components/ui/separator";

//import { useUser } from "./contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useUser();

  console.log(isAuthenticated);
  // if (isAuthenticated) {
  return (
    <div className=" w-screen flex  min-h-screen">
      <div >
        <Image src="/GDS.png" alt=" " width={960} height={540} className="mx-[-40px] " />
      </div>

      <div className=" ">
        <p className=" text-2xl my-10">Orgãos da Prefeitura de Anápolis que utilizam o gerênciador de senhas</p>
        <div className="flex gap-4">
          <Link href="/sine/gerenciaDeTela" ><Button className="bg-[#1270b7] hover:bg-sky-500 text-2xl p-6">Sine</Button></Link>
          <Link href="/sine/gerenciaDeTela" ><Button className="bg-[#1270b7] hover:bg-sky-500 text-2xl p-6">Procon</Button></Link>
        </div>

      </div>

    </div>
  );

}

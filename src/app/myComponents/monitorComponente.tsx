"use client";

import { Separator } from "@/components/ui/separator";
//import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  ultimasChamadas: { name: string; guiche: string; prioridade: boolean }[];
}
export default function MonitorComponente({ ultimasChamadas }: Props) {
  console.log(ultimasChamadas);
  //console.log(ultimasChamadas[0]);
  return (
    <div className=" flex flex-col h-full  items-center justify-center  w-full  ">
      {ultimasChamadas[0] ? <div className=" h-full    flex flex-col ">

        <div className="g-red-300 w-screen  h-4/12 lg:h-6/12 flex flex-col justify-around items-center ">
          <p className="text-2xl lg:text-8xl font-bold text-[#1270b7] ">
            {ultimasChamadas[0].name}
          </p>

          <div className="flex flex-col items-center justify-center">
            <p className="text-xl lg:text-3xl">Local de Atendimento: </p>
            <p className="text-2xl lg:text-6xl font-bold text-[#1270b7]">
              {ultimasChamadas[0].guiche}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center" >
            <p className="text-xl lg:text-3xl">Atendimento: </p>
            <p className="text-2xl lg:text-6xl font-bold text-[#1270b7]">
              {ultimasChamadas[0].prioridade ? "Prioridade" : "Convêncional"}
            </p>
          </div>

        </div>
        <div className="bg-[#1270b7] flex justify-center items-center mt-5  p-3  text-slate-200 font-bold">
          <p className="text-xl lg:text-3xl mx-auto">Ultimas Chamadas</p>
        </div>

        <div className="flex flex-col items-center gap-5 lg:hidden   ">
          {ultimasChamadas[1] ? <div className="pt-4 px-2 ">
            <p><span className="font-semibold">Nome</span> {ultimasChamadas[1].name}</p>
            <p><span className="font-semibold">Local de Atendimento: </span> {ultimasChamadas[1].guiche}</p>
            <p><span className="font-semibold">Atendimento: </span>{ultimasChamadas[1].prioridade ? "Prioridade" : "Convencional"}</p>

          </div> : <p>Não Consta</p>}

          <Separator orientation="horizontal" />

          {ultimasChamadas[2] ? <div className="px-2">
            <p><span className="font-semibold">Nome: </span> {ultimasChamadas[2].name}</p>
            <p><span className="font-semibold">Local de Atendimento: </span> {ultimasChamadas[1].guiche}</p>
            <p><span className="font-semibold">Prioridade: </span> {ultimasChamadas[2].prioridade ? "Prioridade" : "Convencional"}</p>

          </div> : ""}

        </div>

        {/* Esta parte aparecerá somente para telas lg */}
        <div className="lg:flex   justify-around mx-2 p-4 hidden">
          <div className="flex flex-col items-center">
            <p className="text-2xl mb-2 font-semibold">Nome</p>
            <p className="text-2xl ">{ultimasChamadas[1] ? ultimasChamadas[1].name : "XXXXXXX"}</p>
            <p className="text-2xl">{ultimasChamadas[2] ? ultimasChamadas[2].name : "XXXXXXX"}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl  mb-2 font-semibold">Local de Atendimento</p>
            <p className="text-2xl">{ultimasChamadas[1] ? ultimasChamadas[1].guiche : "XXXXXXX"}</p>
            <p className="text-2xl">{ultimasChamadas[2] ? ultimasChamadas[2].guiche : "XXXXXXX"}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl  mb-2 font-semibold">Atendimento</p>
            <p className="text-2xl">{ultimasChamadas[1] ? (ultimasChamadas[1].prioridade ? "Prioritário" : "Convencional") : "xxxxxxx"}</p>
            <p className="text-2xl">{ultimasChamadas[2] ? (ultimasChamadas[2].prioridade ? <p>Prioritário</p> : <p>Convencional</p>) : "xxxxxxx"}</p>
          </div>


        </div>


      </div> : <div className="h-full bg-red-500">Não temos</div>}


    </div>
  );
}



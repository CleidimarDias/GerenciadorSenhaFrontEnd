"use client";
import MonitorComponente from "@/app/myComponents/monitorComponente";
import { Button } from "@/components/ui/button";
import { falarEmVozAlta } from "@/data/falarEmVozAlta";
import { TypeProximaSenha } from "@/types/typeProximaSenha";

//import Image from "next/image";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

//const socket = io("http://localhost:3001");
// const socket = io("http://192.168.0.12:3001");
const socket = io(`${process.env.NEXT_PUBLIC_URL}`);

export default function Monitor() {
  const [senhaChamada, setSenhaChamda] = useState<TypeProximaSenha | null>(
    null
  );

  const [somAtivado, setSomAtivado] = useState(false);

  //const [ultimasChamadas, setUltimasChamadas] = useState<string[]>([]);

  const [objetoDeSenhaChamada, setObjetoDeSenhaChamada] = useState<
    { name: string; guiche: string; prioridade: boolean }[]
  >([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao websocket");
    });

    socket.on("Senha-Chamada", (data) => {
      console.log("nova senha chamada: ", data);
      setSenhaChamda(data);
    });

    return () => {
      socket.off("senha chamada");
    };
  });

  // const handleAtivarSom = () => {
  //   setSomAtivado(!somAtivado);
  // };

  useEffect(() => {
    if (somAtivado && senhaChamada) {
      const texto = `${senhaChamada.cidadao.name}, favor dirija-se ao ${senhaChamada.guiche.name}`;
      falarEmVozAlta(texto);
    }
  }, [senhaChamada, somAtivado]);

  useEffect(() => {
    if (senhaChamada) {
      const nome = senhaChamada.cidadao.name;
      const guiche = senhaChamada.guiche.name;
      const prioridade = senhaChamada.cidadao.prioridade;

      setObjetoDeSenhaChamada((prev) => {
        const novoArray = [

          { name: nome, guiche: guiche, prioridade: prioridade }, ...prev,
        ];
        return novoArray.slice(0, 3); // mantém só os 3 ultimos
        //return novoArray;
      });
    }
  }, [senhaChamada]);



  console.log("Objeto de senha chamada na page monitor", objetoDeSenhaChamada);

  // useEffect(() => {
  //   const texto = ` ${senhaChamada?.cidadao.name} favor dirija-se ao guichê ${senhaChamada?.guiche.name}`;
  //   falarEmVozAlta(texto);
  // }, [senhaChamada]);

  //console.log("array de senha ultimas Chamadas nom monitor: ", ultimasChamadas);
  console.log("Som ativado?", somAtivado)
  return (
    <div className="  h-[calc(100vh-6.25rem)] fixed right-0">
      {!somAtivado || somAtivado && senhaChamada?.cidadao.name ? (
        <div className="flex flex-col items-center mt-5 h-screen gap-4 w-screen">
          <Button
            onClick={() => setSomAtivado(!somAtivado)}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {somAtivado ? "Desativar Som" : "Ativar Som"}
          </Button>

          <MonitorComponente ultimasChamadas={objetoDeSenhaChamada} />
        </div>
      ) : (
        <MonitorComponente
          // ativarSom={handleAtivarSom}
          ultimasChamadas={objetoDeSenhaChamada}
        />
      )}
    </div>
  );
}

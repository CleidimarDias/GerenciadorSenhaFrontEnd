"use client";
import { falarEmVozAlta } from "@/data/falarEmVozAlta";
import { TypeProximaSenha } from "@/types/typeProximaSenha";

import Image from "next/image";
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

  const [ultimasChamadas, setUltimasChamadas] = useState<string[]>([]);

  const testeArray = [];
  testeArray.unshift(1);
  testeArray.unshift(2);
  testeArray.unshift(3);
  testeArray.unshift(4);
  testeArray.unshift(5);

  console.log("teste array antes do shift: ", testeArray);

  while (testeArray.length > 3) {
    testeArray.pop();
  }

  console.log("teste array: ", testeArray);

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

  useEffect(() => {
    if (somAtivado && senhaChamada) {
      setUltimasChamadas((prev) => [...prev, senhaChamada.cidadao.name]);

      const texto = `${senhaChamada.cidadao.name}, favor dirija-se ao guichê ${senhaChamada.guiche.name}`;
      falarEmVozAlta(texto);
    }
  }, [senhaChamada, somAtivado]);

  // useEffect(() => {
  //   const texto = ` ${senhaChamada?.cidadao.name} favor dirija-se ao guichê ${senhaChamada?.guiche.name}`;
  //   falarEmVozAlta(texto);
  // }, [senhaChamada]);

  console.log("array de senha ultimas Chamadas: ", ultimasChamadas);

  return (
    <div className="h-full w-screen">
      {!somAtivado ? (
        <div className="flex flex-col items-center mt-5 h-screen gap-4 bg-yellow-100">
          <button
            onClick={() => setSomAtivado(true)}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Ativar Som
          </button>

          <div></div>
        </div>
      ) : senhaChamada?.cidadao.name ? (
        <div className="bg-sky-200 my-auto flex flex-col justify-around items-center">
          <p className="text-2xl text-yellow-500 text-left w-screen ml-10 mt-10 animate-pulse md:hidden">
            Chamando...
          </p>
          <div className="flex flex-col justify-between items-center md:gap-20 gap-10 flex-1 my-20 rounded-2xl text-center shadow-2xl shadow-[#1270b7] py-8 px-1 md:shadow-none">
            <p className="md:text-6xl text-4xl font-semibold max-h-screen text-slate-500">
              {senhaChamada.cidadao.prioridade ? "Prioridade" : "Convencional"}
            </p>

            <div>
              <p className="md:text-5xl text-2xl font-medium text-slate-500">
                Cidadão
              </p>
              <p className="md:text-8xl text-4xl font-semibold text-sky-700">
                {senhaChamada.cidadao.name}
              </p>
            </div>
            <div>
              <p className="md:text-6xl text-2xl font-medium text-slate-500">
                Serviço
              </p>
              <p className="md:text-8xl text-4xl font-semibold text-sky-700">
                {senhaChamada.servico.name}
              </p>
            </div>
            <div>
              <p className="md:text-6xl text-2xl font-medium text-slate-500">
                Guichê
              </p>
              <p className="md:text-8xl text-4xl font-semibold text-sky-700">
                {senhaChamada.guiche.name}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full my-auto justify-center items-center gap-4">
          <p className="text-2xl font-semibold opacity-40">
            Gerenciador de Senhas
          </p>
          <Image src="/ampulleta.png" alt="" height={200} width={200} />
          <p className="text-2xl font-semibold opacity-40 text-center">
            Aguardando Chamar a próxima senha...
          </p>
        </div>
      )}
    </div>
  );
}

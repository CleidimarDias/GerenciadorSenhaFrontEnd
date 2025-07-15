"use client";
import MonitorComponente from "@/app/myComponents/monitorComponente";
import { Button } from "@/components/ui/button";
import { falarEmVozAlta } from "@/data/falarEmVozAlta";
import { tocarBip } from "@/data/tocarBip";
import { TypeProximaSenha } from "@/types/typeProximaSenha";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_URL}`);

export default function Monitor() {
  const [somAtivado, setSomAtivado] = useState(false);

  const [objetoDeSenhaChamada, setObjetoDeSenhaChamada] = useState<
    { name: string; guiche: string; prioridade: boolean }[]
  >([]);

  const [filaDeSenhas, setFilaDeSenhas] = useState<TypeProximaSenha[]>([]);
  const [processando, setProcessando] = useState(false);

  // Conexão e recebimento da senha via socket
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao websocket");
    });

    socket.on("Senha-Chamada", (data) => {
      console.log("Nova senha recebida:", data);
      setFilaDeSenhas((prev) => [...prev, data]);
    });

    return () => {
      socket.off("Senha-Chamada");
    };
  }, []);

  // Processa a fila uma por uma
  useEffect(() => {
    if (processando || filaDeSenhas.length === 0) return;

    const proximaSenha = filaDeSenhas[0];
    setProcessando(true);

    const nome = proximaSenha.cidadao.name;
    const guiche = proximaSenha.guiche.name;
    const prioridade = proximaSenha.cidadao.prioridade;
    const texto = `${nome}, favor dirija-se ao ${guiche}`;

    const processarChamada = async () => {
      await tocarBip(); // sempre toca o bip antes

      if (somAtivado) {
        // se o som está ativado, espera a fala terminar
        await falarEmVozAlta(texto);
      }

      // mostra a chamada na tela (em ambos os casos)
      setObjetoDeSenhaChamada((prev) => {
        const novoArray = [{ name: nome, guiche, prioridade }, ...prev];
        return novoArray.slice(0, 3);
      });

      // limpa a fila e libera para a próxima
      setFilaDeSenhas((prev) => prev.slice(1));
      setProcessando(false);
    };

    processarChamada();
  }, [filaDeSenhas, processando, somAtivado]);

  return (
    <div className="h-[calc(100vh-6.25rem)] fixed right-0">
      <div className="flex flex-col items-center mt-5 h-screen gap-4 w-screen">
        <Button
          onClick={() => setSomAtivado(!somAtivado)}
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {somAtivado ? "Desativar Som" : "Ativar Som"}
        </Button>

        <MonitorComponente ultimasChamadas={objetoDeSenhaChamada} />
      </div>
    </div>
  );
}

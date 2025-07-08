// "use client";
// import MonitorComponente from "@/app/myComponents/monitorComponente";
// import { falarEmVozAlta } from "@/data/falarEmVozAlta";
// import { TypeProximaSenha } from "@/types/typeProximaSenha";

// //import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// //const socket = io("http://localhost:3001");
// // const socket = io("http://192.168.0.12:3001");
// const socket = io(`${process.env.NEXT_PUBLIC_URL}`);

// export default function Monitor() {
//   const [senhaChamada, setSenhaChamda] = useState<TypeProximaSenha | null>(
//     null
//   );
//   const [somAtivado, setSomAtivado] = useState(false);

//   const [ultimasChamadas, setUltimasChamadas] = useState<string[]>([]);

//   const testeArray = [];
//   testeArray.unshift(1);
//   testeArray.unshift(2);
//   testeArray.unshift(3);
//   testeArray.unshift(4);
//   testeArray.unshift(5);

//   console.log("teste array antes do shift: ", testeArray);

//   while (testeArray.length > 3) {
//     testeArray.pop();
//   }

//   console.log("teste array: ", testeArray);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Conectado ao websocket");
//     });

//     socket.on("Senha-Chamada", (data) => {
//       console.log("nova senha chamada: ", data);
//       setSenhaChamda(data);
//     });

//     return () => {
//       socket.off("senha chamada");
//     };
//   });

//   const handleAtivarSom = () => {
//     setSomAtivado(!somAtivado);
//   };

//   useEffect(() => {
//     if (somAtivado && senhaChamada) {
//       setUltimasChamadas((prev) => [...prev, senhaChamada.cidadao.name]);

//       const texto = `${senhaChamada.cidadao.name}, favor dirija-se ao guichê ${senhaChamada.guiche.name}`;
//       falarEmVozAlta(texto);
//     }
//   }, [senhaChamada, somAtivado]);

//   // useEffect(() => {
//   //   const texto = ` ${senhaChamada?.cidadao.name} favor dirija-se ao guichê ${senhaChamada?.guiche.name}`;
//   //   falarEmVozAlta(texto);
//   // }, [senhaChamada]);

//   console.log("array de senha ultimas Chamadas: ", ultimasChamadas);

//   return <MonitorComponente somAtivado={somAtivado} />;
// }

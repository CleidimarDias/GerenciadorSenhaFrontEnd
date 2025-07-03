// import { getReparticao } from "@/data/get-reparticao";
// import { getAllServicos } from "@/data/getAllServicos";
// import { CategoriaServico } from "@/types/typesServicos";
// import { notFound } from "next/navigation";
// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// //import { Button } from "@/components/ui/button";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Toaster } from "@/components/ui/sonner";

// import { FormularioCidadaoGerarSenha } from "./formularioCidadaoGerarSenha";
// import { getPeendingSenhas } from "@/data/getAllPeendingSenhas";

// interface TriagemProps {
//   slug: string;
// }

// interface ReparticaoProps {
//   name: string;
//   id: string;
// }

// export default async function Triagem({ slug }: TriagemProps) {
//   const reparticao: ReparticaoProps = await getReparticao(slug);

//   if (!reparticao) {
//     notFound();
//   }

//   const servicos: CategoriaServico[] = await getAllServicos(reparticao.id);

//   if (!servicos) {
//     notFound();
//   }

//   // const AllPeendingSenhas = [];
//   // let resultado;

//   // for (let i = 0; i < servicos.length; i++) {
//   //   // console.log(i);
//   //   resultado = AllPeendingSenhas.push(await getPeendingSenhas(servicos[i].id));
//   // }
//   // console.log("Resultado:", resultado);

//   const AllPeendingSenhas = await Promise.all(
//     servicos.map((servico) => getPeendingSenhas(servico.id))
//   );

//   const quantidadeDeSenhasPorServico = servicos.map((servico, index) => ({
//     nome: servico.name,
//     id: servico.id,
//     quantidade: AllPeendingSenhas[index]?.length || 0,
//   }));

//   console.log(
//     "Quantidade de senha por serviço: ",
//     quantidadeDeSenhasPorServico
//   );

//   return (
//     <div className="h-screen max-w-screen flex flex-col ">
//       <div className="flex justify-around p-10 text-3xl text-gray-800 font-semibold">
//         <h3>Triagem</h3>
//         <h3>{slug.toUpperCase()}</h3>
//       </div>

//       <div className="h-full flex max-w-screen items-center justify-center border-2 mx-4 mb-8 rounded-2xl border-[#1270b7]">
//         <div className="grid grid-cols-4 gap-10 w-full mx-8">
//           {quantidadeDeSenhasPorServico.map((servico) => (
//             <div key={servico.id} className="h-full w-full">
//               <Card className="h-full text-center text-2xl w-full py-10 border-[#1270b7] shadow-xl/60 shadow-[#1270b7] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-100">
//                 <CardHeader>{servico.nome}</CardHeader>
//                 <CardContent>
//                   <p className="mb-4 text-base text-gray-600">
//                     Senhas pendentes: {servico.quantidade}
//                   </p>
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button className="bg-[#1270b7] hover:bg-[#1270b7] text-xl">
//                         Criar senha
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Cidadão</DialogTitle>
//                         <DialogDescription>
//                           Preencha os dados do cidadão
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="py-4">
//                         <div className="items-center gap-4">
//                           <FormularioCidadaoGerarSenha
//                             reparticaoId={reparticao.id}
//                             servicoId={servico.id}
//                           />
//                         </div>
//                         <Toaster />
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

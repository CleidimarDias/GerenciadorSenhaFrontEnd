// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { CreateCidadao } from "@/data/createCidadao";
// import { cidadaoProps } from "@/types/typesCidadao";

// import { toast } from "sonner";

// interface formularioCidadaoGerarSenhaProps {
//   reparticaoId: string;
//   servicoId: string;
// }

// const formSchema = z.object({
//   name: z.string().min(3, {
//     message: "O nome deve ter ao menos 3 caracteres",
//   }),

//   cpf: z.string().min(3, {
//     message: "o cpf deve conter 11 numeors",
//   }),

//   prioridade: z.boolean(),
// });

// export function FormularioCidadaoGerarSenha({
//   reparticaoId,
//   servicoId,
// }: formularioCidadaoGerarSenhaProps) {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       cpf: "",
//       prioridade: false,
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const cidadao: cidadaoProps = await CreateCidadao({
//         name: values.name,
//         cpf: values.cpf,
//         prioridade: values.prioridade,
//         reparticaoId: reparticaoId,
//       });
//       console.log("Cidadão criado com sucesso:", cidadao.name);
//       console.log("ServiçoId: ", servicoId);
//       const res = await fetch(
//         `http://localhost:3001/senha/servicoId/${servicoId}/cidadaoId/${cidadao.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "aplication/json",
//           },
//           // body: JSON.stringify({
//           //   cidadaoId: cidadao.id
//           // })
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Erro ao criar senha!");
//       }

//       const senhaCriada = await res.json();

//       toast("Senha criada com sucesso", {
//         action: {
//           label: "Fechar",
//           onClick: () => console.log("Fechado"),
//         },
//       });
//       console.log("Senha Criada!!!", senhaCriada);
//     } catch (error) {
//       console.error("Erro ao criar cidadão:", error);
//     }
//   };

//   // ...

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nome</FormLabel>
//               <FormControl>
//                 <Input placeholder="Nome" {...field} />
//               </FormControl>
//               <FormDescription>
//                 Insira o nome completo do cidadão.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="cpf"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>CPF</FormLabel>
//               <FormControl>
//                 <Input placeholder="CPF" {...field} />
//               </FormControl>
//               <FormDescription>Digite os números do cpf</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="prioridade"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
//               <FormLabel className="text-red-600">Prioridade</FormLabel>
//               <FormDescription className="text-red-600">
//                 Atendimento Prioritário
//               </FormDescription>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button className="bg-[#1270b7] w-full" type="submit">
//           Enviar
//         </Button>
//       </form>
//     </Form>
//   );
// }

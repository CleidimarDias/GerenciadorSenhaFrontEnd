"use client";
// import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setCookie } from "cookies-next";
// import { cookies } from "next/headers";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLogin } from "@/data/get-login";

import { useUser } from "@/app/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useState } from "react";


interface slugProps {
  slug: string;
}

const cpfRegexComFormatacao = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const removerPontosTracosRegex = /[.-]/g;

const formSchema = z.object({
  cpf: z
    .string()
    .regex(cpfRegexComFormatacao, {
      message: "CPF inválido (formato esperado: XXX.XXX.XXX-XX)",
    })
    .transform((valor) => valor.replace(removerPontosTracosRegex, "")),
  password: z
    .string()
    .min(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
});

export default function FormularioLogin({ slug }: slugProps) {
  //const [isLogged, setIsLogged] = useState(false)
  const { setUser, user } = useUser();
  const [showSkeleton, setShowSkeleton] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setShowSkeleton(true);
    const result = await getLogin(values);

    if (result) {
      console.log("Login bem sucedido");
      setCookie("token", result.token);
      setUser(result);

      redirect(`/${slug}/gerenciaDeTela`);
      setShowSkeleton(false);

      // console.log(result.token);
    } else {
      console.error("CPF ou Senha incorretos");
    }

    console.log("user: ", user);
  }

  // const handleTeste = () => {
  //   MudarPalavra("palavra mudada");
  //   redirect("/");
  // };

  return (
    // #1270b7
    <Card className=" text-[#1270b7]    w-80 md:w-xl md:flex md:flex-col md:justify-center rounded-none h-4/5 md:h-full pt-20 ">
      <CardHeader>
        <CardTitle className="text-[#1270b7] text-3xl">LOGIN</CardTitle>
        <CardDescription className="text-[#1270b7]">
          Faça seu login para acessar ao gerênciador de senhas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="text-2xl">
                  <FormLabel className="text-xl">cpf</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu cpf..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!showSkeleton ? (
              <Button className="bg-[#1270b7] hover:bg-blue-600 w-full text-2xl h-fit">
                Enviar
              </Button>
            ) : (
              <Skeleton className="w-full bg-[#1270b7] h-[50px]" />
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

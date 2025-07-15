"use client";

import Image from "next/image";
import { useUser } from "./contexts/AuthContext";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getAllReparticoes } from "@/data/getAllReparticoes";
import { Skeleton } from "@/components/ui/skeleton";
import toast, { Toaster } from 'react-hot-toast';

//import { Separator } from "@/components/ui/separator";

//import { useUser } from "./contexts/AuthContext";

export default function Home() {

  type TReparticao = {
    name: string;
    slug: string;
  }

  const { isAuthenticated } = useUser();
  const [reparticoes, setReparticoes] = useState<TReparticao[] | null>(null)
  const [showSkeleton, setShowSkeleton] = useState(false)

  useEffect(() => {
    const dataReparticao = async () => {
      setShowSkeleton(true)
      try {
        const res = await getAllReparticoes();
        if (!res) {
          toast.error("Erro ao buscar repartições")
          setShowSkeleton(false)
          console.error("Não foi possível carrgar as repartições")
        }
        setShowSkeleton(false)
        setReparticoes(res)
        return reparticoes;
      } catch (error) {
        toast.error("Erro")
        setShowSkeleton(false)
        console.error("Erro de servidor", error)
      }
    }
    dataReparticao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(reparticoes)

  console.log(isAuthenticated);
  // if (isAuthenticated) {
  return (
    <div className=" w-screen flex flex-col-reverse lg:flex-row  max-h-screen gap-4 lg:gap-0">
      <div className="mx-auto" >
        <Image src="/GDS.png" alt=" " width={960} height={540} className="mx-[-40px] " />
      </div>

      <div className="  flex flex-col items-center justify-center  lg:mt-30 ">
        <p className=" text-2xl my-10  text-center">Repartições da Prefeitura de <span className="font-medium text-4xl bg-gradient-to-r from-sky-500  to-sky-700 text-transparent bg-clip-text">Anápolis</span>  que utilizam o <span className="font-medium text-4xl bg-gradient-to-r from-sky-500  to-sky-700 text-transparent bg-clip-text ">gerênciador de senhas.</span></p>

        {!showSkeleton ? <div className="flex gap-4">
          <Card className="">
            <CardHeader>
              <CardTitle>
                Gerênciador de Senhas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-2 ">
              {reparticoes && reparticoes.map((reparticao) => (<Link key={reparticao.slug} href={`/${reparticao.slug}/gerenciaDeTela`} ><Button className="bg-[#1270b7] hover:bg-sky-500 text-2xl p-6 cursor-pointer w-full">{reparticao.name}</Button></Link>))}


            </CardContent>
            <CardFooter>
              Prefeitura de Anápolis
            </CardFooter>
          </Card>



        </div> : <Skeleton className="w-96 h-48 bg-sky-300" />}


      </div>
      <Toaster position="top-center" />
    </div>
  );

}

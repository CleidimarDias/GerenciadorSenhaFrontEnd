"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { getReparticao } from '@/data/get-reparticao'
import { CreateLocalDeAtendimento } from '@/data/createLocalDeAtendimento'
import toast, { Toaster } from 'react-hot-toast';





interface ReparticaoProps {
    id: string;
}

interface PainelProps {
    slug: string;
}
const formSchema = z.object({
    name: z.string().min(1, "Nome do local é obrigatório"),

})


export default function FormularioCriarLocalDeAtendimento({ slug }: PainelProps) {


    const [reparticaoId, setReparticaoId] = useState("")




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    useEffect(() => {
        const buscarReparticao = async () => {
            try {
                const res: Promise<ReparticaoProps> = await getReparticao(slug)

                if (!res) {
                    throw new Error("Erro ao buscar dados")
                }
                setReparticaoId((await res).id)
            } catch (error) {
                console.error(error)
            }
        }
        buscarReparticao();
    }, [slug])

    console.log("REPARTIÇÃO ID: ", reparticaoId)

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            const data = await CreateLocalDeAtendimento({ name: values.name, reparticaoId })
            if (data.ok) {
                toast.success("Usuário cadastrado com sucesso")
            }


        } catch (error) {
            console.error(error)
            toast.error("Erro ao cadastrar usuário")
        }

        console.log(values)
    }

    return (
        <Card className="w-60 lg:w-150 h-fit  rounded-none flex flex-col gap-5 ">
            <CardHeader>
                <CardTitle className="lg:text-2xl text-xl">Local de Atendimento</CardTitle>
                <CardDescription>Digite o nome do local de atendimento.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Nome do local de atendimento</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="Nome..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ex: Guichê 1
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="w-full py-6 text-xl bg-[#1270b7]">Cadastrar</Button>
                    </form>
                </Form>

            </CardContent>
            <Toaster />
        </Card>
    )
}

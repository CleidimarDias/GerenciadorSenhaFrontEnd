"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { getReparticao } from '@/data/get-reparticao'
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton'
import { CreateServicoOferecido } from '@/data/createServicoOferecido'





interface ReparticaoProps {
    id: string;
}

interface PainelProps {
    slug: string;
}
const formSchema = z.object({
    name: z.string().min(1, "Nome do local é obrigatório"),
    slug: z.string().min(1, "Sigla é obrigatória")

})


export default function FormularioCriarServicosOferecidos({ slug }: PainelProps) {


    const [reparticaoId, setReparticaoId] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(false)




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: ""
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
        setShowSkeleton(true)
        try {
            const data = await CreateServicoOferecido({ name: values.name, slug: values.slug, reparticaoId })
            if (data) {
                toast.success("Serviço criado com sucesso!")
                setShowSkeleton(false)
            } else {
                toast.error("Erro ao serviço!")
                setShowSkeleton(false)
            }


        } catch (error) {
            toast.error("Erro no servidor")
            setShowSkeleton(false)
            console.error(error)

        }

        console.log(values)
    }

    return (
        <Card className="w-60 lg:w-150 h-fit  rounded-none flex flex-col gap-5 ">
            <CardHeader>
                <CardTitle className="lg:text-2xl text-xl">Serviços Oferecidos</CardTitle>
                <CardDescription>cadastre o serviço oferecido.</CardDescription>
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
                                        <Input placeholder="Nome do serviço..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ex: Vagas de Emprego
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cadastre a sigla do serviço oferecido</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sigla..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ex: VE para vagas de emprego.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {!showSkeleton ? <Button type="submit" className="w-full py-6 text-xl bg-[#1270b7]">Cadastrar</Button> : <Skeleton className="h-[48px] w-[190px] lg:w-full rounded-lg bg-[#1270b7]" />}

                    </form>
                </Form>

            </CardContent>
            <Toaster />
        </Card>
    )
}

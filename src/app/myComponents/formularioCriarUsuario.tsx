"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateUsuario } from '@/data/createUsuario'
import { getReparticao } from '@/data/get-reparticao'




interface ReparticaoProps {
    id: string;
}

interface PainelProps {
    slug: string;
}
const formSchema = z.object({
    name: z.string().min(3),
    cpf: z.string().max(14, 'Quantidade de caracteres insuficiente'),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
})


export default function FormularioCriarUsuario({ slug }: PainelProps) {


    const [reparticaoId, setReparticaoId] = useState("")




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
            password: ""
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
            const data = await CreateUsuario({ name: values.name, cpf: values.cpf, password: values.password, reparticaoId })
            console.log(data)
        } catch (error) {
            console.error(error)
        }

        console.log(values)
    }

    return (
        <Card className="w-60 lg:w-150 h-fit  rounded-none flex flex-col gap-5 ">
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">Cadastrar Usuário</CardTitle>
                <CardDescription>Digite os dados do usuário.</CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nome Completo
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CPF..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ex: 000.000.000-00
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senha..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Senha deve conter no mínimo 6 caracteres.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full py-6 text-xl bg-[#1270b7]">Cadastrar</Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

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
import toast, { Toaster } from 'react-hot-toast'
import { withMask } from 'use-mask-input';
import { Skeleton } from "@/components/ui/skeleton"




interface ReparticaoProps {
    id: string;
}

interface PainelProps {
    slug: string;
}

const cpfRegexComFormatacao = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const removerPontosTracosRegex = /[.-]/g;

const formSchema = z.object({
    name: z.string().min(3),
    cpf: z
        .string()
        .regex(cpfRegexComFormatacao, {
            message: "CPF inválido (formato esperado: XXX.XXX.XXX-XX)",
        })
        .transform((valor) => valor.replace(removerPontosTracosRegex, "")),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    passwordConfirmation: z.string().min(1, "O Campo confirmação de senha deve ser preenchido")
}).refine((data) => {
    return data.password === data.passwordConfirmation
}, { message: "As senhas devem coincidir", path: ['passwordConfirmation'] })


export default function FormularioCriarUsuario({ slug }: PainelProps) {


    const [reparticaoId, setReparticaoId] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
            password: "",
            passwordConfirmation: ""
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
            const data = await CreateUsuario({ name: values.name, cpf: values.cpf, password: values.password, reparticaoId })
            toast.success("Usuário criado com sucesso")
            setShowSkeleton(false)
            console.log(data)
        } catch (error) {
            setShowSkeleton(false)
            toast.error("Erro ao criar usuário")
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
                        <div className="flex flex-col lg:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
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
                                            <Input placeholder="CPF..." {...field} ref={withMask('999.999.999-99')} />
                                        </FormControl>
                                        <FormDescription>
                                            Ex: 000.000.000-00
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
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

                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirmar senha..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Repita sua senha
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        {!showSkeleton ? <Button type="submit" className="w-full py-6 text-xl bg-[#1270b7] hover:bg-sky-500">Cadastrar</Button> : <Skeleton className="h-[48px] w-[190px] lg:w-full rounded-lg bg-[#1270b7]" />}


                    </form>
                    <Toaster />
                </Form>

            </CardContent>
        </Card>

        // <Card className="w-60 lg:w-150 h-fit  rounded-none flex flex-col gap-5 ">
        //     <CardHeader>
        //         <CardTitle className="text-xl lg:text-2xl">Cadastrar Usuário</CardTitle>
        //         <CardDescription>Digite os dados do usuário.</CardDescription>
        //     </CardHeader>
        //     <CardContent>

        //         <Form {...form}>
        //             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        //                 <FormField
        //                     control={form.control}
        //                     name="name"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Nome</FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="Nome..." {...field} />
        //                             </FormControl>
        //                             <FormDescription>
        //                                 Nome Completo
        //                             </FormDescription>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <FormField
        //                     control={form.control}
        //                     name="cpf"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>CPF</FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="CPF..." {...field} ref={withMask('999.999.999-99')} />
        //                             </FormControl>
        //                             <FormDescription>
        //                                 Ex: 000.000.000-00
        //                             </FormDescription>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <FormField
        //                     control={form.control}
        //                     name="password"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Senha</FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="Senha..." {...field} />
        //                             </FormControl>
        //                             <FormDescription>
        //                                 Senha deve conter no mínimo 6 caracteres.
        //                             </FormDescription>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 {!showSkeleton ? <Button type="submit" className="w-full py-6 text-xl bg-[#1270b7] hover:bg-sky-500">Cadastrar</Button> : <Skeleton className="h-[48px] w-[190px] lg:w-full rounded-lg bg-[#1270b7]" />}


        //             </form>
        //             <Toaster />
        //         </Form>

        //     </CardContent>
        // </Card>
    )
}

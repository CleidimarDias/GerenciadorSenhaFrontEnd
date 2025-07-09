import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  //FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useGuiche } from "@/app/contexts/guicheContext";

const FormSchema = z.object({
  guiche: z.string({
    required_error: "Favor selecione o guichê",
  }),
});

type framworkPros = {
  value: string;
  label: string;
};

interface cardEscolhaGhicheProps {
  frameworks?: framworkPros[];
}

export default function CardEscolhaGuiche({
  frameworks,
}: cardEscolhaGhicheProps) {
  const [guicheSelecionado, setGuicheSeleicionado] =
    useState<framworkPros | null>(null);

  const { setGuiche } = useGuiche();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const guiche = frameworks?.find((numero) => numero.value === data.guiche);
    setGuicheSeleicionado(guiche || null);
    setGuiche({ name: guiche?.label as string, id: guiche?.value as string });
  }

  console.log("Guiche Selecionado: ", guicheSelecionado?.label);

  return (
    <Card className="">
      <CardContent className=" ">
        <div className="-blue-500 h-full flex flex-col-reverse gap-5  md:flex-row md:justify-around w-full  items-center justify-center my-8">
          <Card className=" w-[280px] text-slate-600">
            <CardHeader>
              <CardTitle>Selecione o Local </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="guiche"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        {/* <FormLabel>Guichês</FormLabel> */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value && frameworks
                                  ? frameworks.find(
                                      (guiche) => guiche.value === field.value
                                    )?.label
                                  : "Selecione o Guichê"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search framework..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum local encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {frameworks &&
                                    frameworks.map((guiche) => (
                                      <CommandItem
                                        value={guiche.label}
                                        key={guiche.value}
                                        onSelect={() => {
                                          form.setValue("guiche", guiche.value);
                                        }}
                                      >
                                        {guiche.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            guiche.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="mt-4">
                          Este local será utilizado para os atendimentos.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full boder-2  bg-[#1270b7] text-white hover:bg-blue-600 hover:text-white text-xl "
                  >
                    <p className="p-4 m-4">Selecionar</p>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className=" w-full  text-slate-600 border-y  md:border-none  flex flex-col  justify-center items-center gap-4 m-2">
            <p className="md:text-xl ">Local Selecionado</p>
            <p className="text-3xl md:text-4xl ">
              {guicheSelecionado ? guicheSelecionado.label : "?"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

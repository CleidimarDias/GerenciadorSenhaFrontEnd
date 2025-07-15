type TLocalDeAtendimento = {
  reparticaoId: string;
  name: string;
  slug: string;
};

export const CreateServicoOferecido = async ({
  reparticaoId,
  name,
  slug,
}: TLocalDeAtendimento) => {
  try {
    const res = await fetch(
      // `http://localhost:3001/cidadao/reparticaoId/${reparticaoId}`,

      `${process.env.NEXT_PUBLIC_URL}/servico/reparticaoId/${reparticaoId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, slug }),
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao criar Serviço");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no servidor:", error);
    throw error;
  }
};

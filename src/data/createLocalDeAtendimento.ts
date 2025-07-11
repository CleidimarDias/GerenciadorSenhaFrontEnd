type TLocalDeAtendimento = {
  reparticaoId: string;
  name: string;
};

export const CreateLocalDeAtendimento = async ({
  reparticaoId,
  name,
}: TLocalDeAtendimento) => {
  try {
    const res = await fetch(
      // `http://localhost:3001/cidadao/reparticaoId/${reparticaoId}`,

      `${process.env.NEXT_PUBLIC_URL}/guiche/reparticaoId/${reparticaoId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao criar Reparticao");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no frontend:", error);
    throw error;
  }
};

export const CreateCidadao = async ({
  reparticaoId,
  name,
  cpf,
  prioridade,
}: {
  reparticaoId: string;
  name: string;
  cpf: string;
  prioridade: boolean;
}) => {
  const res = await fetch(
    `http://localhost:3001/cidadao/reparticaoId/${reparticaoId}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, cpf, prioridade }),
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao criar cidadão");
  }

  const data = await res.json();
  return data;
};

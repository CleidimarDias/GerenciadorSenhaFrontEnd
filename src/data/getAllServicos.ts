export const getAllServicos = async (reparticaoId: string) => {
  const res = await fetch(
    `http://localhost:3001/reparticao/reparticaoId/${reparticaoId}/allServicos`
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar serviços");
  }

  const data = await res.json();
  return data;
};

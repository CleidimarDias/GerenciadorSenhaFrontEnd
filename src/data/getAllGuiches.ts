export const getAllGuiches = async (reparticaoId: string) => {
  const res = await fetch(
    `http://localhost:3001/guiche/reparticaoId/${reparticaoId}`
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar serviços");
  }

  const data = await res.json();

  return data;
};

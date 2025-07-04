export const getAllGuiches = async (reparticaoId: string) => {
  const res = await fetch(
    // `http://localhost:3001/guiche/reparticaoId/${reparticaoId}`
    `${process.env.NEXT_PUBLIC_URL}/guiche/reparticaoId/${reparticaoId}`
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar Guichês");
  }

  const data = await res.json();

  return data;
};

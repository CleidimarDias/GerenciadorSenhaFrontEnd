export const getReparticao = async (slug: string) => {
  const res = await fetch(
    `http://localhost:3001/reparticao/reparticaoSlug/${slug}`
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar repartição");
  }

  const data = await res.json();
  return data;
};

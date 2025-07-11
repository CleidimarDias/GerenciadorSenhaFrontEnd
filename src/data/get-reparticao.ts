export const getReparticao = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/reparticao/reparticaoSlug/${slug}`
      // `https://gerenciadordesenhabackend.onrender.com/reparticao/reparticaoSlug/${slug}`
      // `http://localhost:3001/reparticao/reparticaoSlug/${slug}`
    );

    if (!res.ok) {
      throw new Error("Erro ao carregar repartição");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

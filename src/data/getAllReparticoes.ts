export const getAllReparticoes = async () => {
  try {
    const res = await fetch(
      // `http://localhost:3001/guiche/reparticaoId/${reparticaoId}`
      `${process.env.NEXT_PUBLIC_URL}/reparticao`
    );

    if (!res.ok) {
      throw new Error("Não foi possível encontrar repartição");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error no servidor", error);
  }
};

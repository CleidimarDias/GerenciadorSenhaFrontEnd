type TUsuario = {
  reparticaoId: string;
  name: string;
  cpf: string;
  password: string;
};

export const CreateUsuario = async ({
  name,
  cpf,
  password,
  reparticaoId,
}: TUsuario) => {
  try {
    const res = await fetch(
      // `http://localhost:3001/cidadao/reparticaoId/${reparticaoId}`,

      `${process.env.NEXT_PUBLIC_URL}/user/reparticaoId/${reparticaoId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, cpf, password }),
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao criar usuario");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no frontend:", error);
    throw error;
  }
};

interface IValuesLogin {
  cpf: string;
  password: string;
}

type dataProps = {
  token: string;
  UserLogin: {
    name: string;
    id: string;
    cpf: string;
    role: string;
  };
};

export const getLogin = async (
  values: IValuesLogin
): Promise<dataProps | null> => {
  try {
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Dados enviados com sucesso");

      return data;
    } else {
      console.log("Ocorreu um erro ao enviar os dados");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar no servidor", error);
    return null;
  }
};

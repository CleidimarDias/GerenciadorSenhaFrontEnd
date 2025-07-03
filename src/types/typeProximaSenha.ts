type StatusSenha = "EM_ATENDIMENTO" | "AGUARDANDO" | "FINALIZADO" | "CANCELADO"; // ajuste conforme os possíveis status

interface Cidadao {
  cpf: string;
  name: string;
  prioridade: boolean;
}

interface Guiche {
  name: string;
}

interface Servico {
  name: string;
}

interface Usuario {
  name: string;
}

export interface TypeProximaSenha {
  id: number;
  senha: string;
  numeroOrdem: number;
  status: StatusSenha;
  guicheId: string;
  servicoId: string;
  cidadaoId: string;
  usuarioId: string;
  createdAt: string; // ou Date, se estiver convertendo ao receber
  updatedAt: string; // ou Date
  cidadao: Cidadao;
  guiche: Guiche;
  servico: Servico;
  usuario: Usuario;
}

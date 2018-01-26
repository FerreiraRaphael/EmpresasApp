export interface CompanyCreate {
  razaoSocial: string;
  cnpj: string;
  status: boolean;
  branchStatus: boolean;
  city: string;
  state: string;
}

export interface Company {
  razaoSocial: string;
  id: number;
  cnpjBase: string;
  status: boolean;
}

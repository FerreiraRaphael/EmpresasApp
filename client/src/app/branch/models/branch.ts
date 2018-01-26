export interface CreateBranch {
  CompanyId: number;
  razaoSocial: string;
  cnpjBase: string;
  cnpj: string;
  city: string;
  state: string;
  status: string;
}

export interface Branch {
  id: number;
  cnpj: string;
  city: string;
  state: string;
  status: boolean;
  CompanyId: number;
}

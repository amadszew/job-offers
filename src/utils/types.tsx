export interface PropsType {
  items: Jobs[],
}

export type Jobs = {
  id: number,
  created_at: string,
  title: string,
  company: string,
  description: string,
  salary: number,
  location: string,
  location_state: string,
  department: string,
  salary_currency: string
}

export type PaginationTypes = {
  nofPages: number,
  pagesLimit: number, 
  currPage: number,
  setPage: (value: number) => void;
}

export type SearchType = {
  setSearch: (value: string) => void;
  searchVal: string
}

export type FormDataType = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  cv_file_id: string
}

export type InputTypes = {
  type: string, 
  id: string, 
  label: string, 
  placeholder: string,
  error: string, 
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
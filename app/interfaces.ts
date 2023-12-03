export interface INumerologyIndex {
  id: string;
  name: string;
  title_vn: string;
  title_en?: string;
  description?: string;
  value?: number;
  type?: IndexType;
}

export enum IndexType {
  Main = "MAIN",
  Secondary = "SECONDARY",
  Other = "OTHER",
}

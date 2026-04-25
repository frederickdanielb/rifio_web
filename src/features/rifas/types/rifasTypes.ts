export type RifaStatus = 'draft' | 'active' | 'closed';

export interface Rifa {
  id: string;
  title: string;
  description: string;
  prize: string;
  drawDate: string;
  totalNumbers: number;
  soldNumbers: number;
  status: RifaStatus;
}

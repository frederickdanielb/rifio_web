export interface TicketAvailabilityItem {
  number: number;
  isAvailable: boolean;
}

export interface FetchAvailabilityRequestDto {
  rifaId: string;
}

export interface ReserveTicketsRequestDto {
  rifaId: string;
  numbers: number[];
}

export interface ApiResponse {
    totalItems: number;
    data: Game[];
    totalPages: number;
    pageSize: number;
    currentPage: number;
  }
  
  export interface Game {
    idGame: number;
    descripcion: string;
  }
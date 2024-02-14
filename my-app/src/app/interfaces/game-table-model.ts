export interface Games {
    idGame : number;
    descripcion : string;
    //idPlayers : string[];
    
}
export interface GameTable {
    totalItems: number;
    data: Games[]; 
    totalPages: number;
    pageSize: number;
    currentPage: number;
}
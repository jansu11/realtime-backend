interface StockPosition {
  date: Date;
  price: number;
  quantity: number;
  symbol: string;
}

interface WatchlistStock {
  symbol: string;
}

interface SectorLeader {
  sectorName: string;
}

interface CloseData {
  symbol : string; 
  quantity: number;
  purchase_price: number;
  sell_price: number;
  exit_date: Date;
  pNl: number;
}

export default CloseData
import mongoose,{Schema,Document} from 'mongoose';

export interface ILivePosition extends Document {
  symbol: string;
  avg_price: number,
  total_quantity: number;
}

const LivePositionSchema = new Schema<ILivePosition>(
  {
    symbol : {type: String, required:true, unique: true},
    avg_price: {type: Number, required: true},
    total_quantity: {type: Number, required: true}

  }
)

const stockPositionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  symbol: { type: String, required: true }
});

const watchlistStockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
});

const sectorLeaderSchema = new mongoose.Schema({
  sectorName: { type: String, required: true, unique: true },
});

const tradeHistory = new mongoose.Schema({
  symbol : {type: String, required:true},
  purchase_price : {type: Number, required:true},
  sell_price : {type: Number, required:true},
  quantity : {type: Number, required:true},
  entry_date : {type: String, required: true},
  exit_date : {type: String, required :true},
  pNl : {type: Number, required:true} 



})
export const StockPosition = mongoose.model('StockPosition', stockPositionSchema);
export const WatchlistStock = mongoose.model('WatchlistStock', watchlistStockSchema);
export const SectorLeader = mongoose.model('SectorLeader', sectorLeaderSchema);
export const LivePosition = mongoose.model<ILivePosition>("LivePosition",LivePositionSchema);
export const TradeHistory = mongoose.model('TradeHistory',tradeHistory);
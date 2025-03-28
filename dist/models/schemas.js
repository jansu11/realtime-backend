"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeHistory = exports.SectorLeader = exports.WatchlistStock = exports.StockPosition = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stockPositionSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    symbol: { type: String, required: true }
});
const watchlistStockSchema = new mongoose_1.default.Schema({
    symbol: { type: String, required: true, unique: true },
});
const sectorLeaderSchema = new mongoose_1.default.Schema({
    sectorName: { type: String, required: true, unique: true },
});
const tradeHistory = new mongoose_1.default.Schema({
    symbol: { type: String, required: true },
    purchase_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    entry_date: { type: String, required: true },
    exit_date: { type: String, required: true },
    pNl: { type: Number, required: true }
});
exports.StockPosition = mongoose_1.default.model('StockPosition', stockPositionSchema);
exports.WatchlistStock = mongoose_1.default.model('WatchlistStock', watchlistStockSchema);
exports.SectorLeader = mongoose_1.default.model('SectorLeader', sectorLeaderSchema);
exports.TradeHistory = mongoose_1.default.model('TradeHistory', tradeHistory);

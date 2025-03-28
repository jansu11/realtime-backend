"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorLeader = exports.WatchlistStock = exports.StockPosition = void 0;
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
exports.StockPosition = mongoose_1.default.model('StockPosition', stockPositionSchema);
exports.WatchlistStock = mongoose_1.default.model('WatchlistStock', watchlistStockSchema);
exports.SectorLeader = mongoose_1.default.model('SectorLeader', sectorLeaderSchema);

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeHistory = exports.LivePosition = exports.SectorLeader = exports.WatchlistStock = exports.StockPosition = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LivePositionSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
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
    purchase_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    exit_date: { type: String, required: true },
    pNl: { type: Number, required: true }
});
exports.StockPosition = mongoose_1.default.model('StockPosition', stockPositionSchema);
exports.WatchlistStock = mongoose_1.default.model('WatchlistStock', watchlistStockSchema);
exports.SectorLeader = mongoose_1.default.model('SectorLeader', sectorLeaderSchema);
exports.LivePosition = mongoose_1.default.model("LivePosition", LivePositionSchema);
exports.TradeHistory = mongoose_1.default.model('TradeHistory', tradeHistory);

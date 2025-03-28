"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../models/schemas");
const router = express_1.default.Router();
// Add new stock position
router.post('/position', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = new schemas_1.StockPosition(req.body);
        yield position.save();
        res.status(201).json(position);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/watchlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watchlistStock = new schemas_1.WatchlistStock(req.body);
        yield watchlistStock.save();
        res.status(201).json(watchlistStock);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/sector-leader', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectorLeader = new schemas_1.SectorLeader(req.body);
        yield sectorLeader.save();
        res.status(201).json(sectorLeader);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.get('/positions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const positions = yield schemas_1.StockPosition.find();
        res.json(positions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/watchlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watchlistStocks = yield schemas_1.WatchlistStock.find();
        res.json(watchlistStocks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/sector-leaders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectorLeaders = yield schemas_1.SectorLeader.find();
        res.json(sectorLeaders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;

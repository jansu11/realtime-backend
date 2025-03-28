"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env fil
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('combined', {
    stream: {
        write: (message) => logger_1.default.info(message.trim()), // Log requests with Winston
    },
}));
// MongoDB connection
(0, dbConnect_1.default)();
app.use('/api/stocks', stockRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

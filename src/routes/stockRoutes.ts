import express,{Request,Response} from 'express';
import { LivePosition,StockPosition, WatchlistStock, SectorLeader, TradeHistory} from '../models/schemas';

const router = express.Router();

// Add new stock position
router.post('/position', async (req, res) => {
  try {
    const {symbol, quantity,price} = req.body
    const position = new StockPosition(req.body);
    await position.save();


    const existingLivePosition = await LivePosition.findOne({symbol});

    if (existingLivePosition){
      const newTotalQuantiy = existingLivePosition.quantity + quantity;
      const newAvgPrice = (existingLivePosition.price * existingLivePosition.quantity + price * quantity)/ newTotalQuantiy;
      existingLivePosition.price = newAvgPrice;
      existingLivePosition.quantity = newTotalQuantiy;
      await existingLivePosition.save();
    }else {
      const newLivePosition = new LivePosition({
        symbol,
         price ,
        quantity,

      });
      await newLivePosition.save()
    }
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Add watchlist stock
router.post('/watchlist', async (req, res) => {
  try {
    const watchlistStock = new WatchlistStock(req.body);
    await watchlistStock.save();
    res.status(201).json(watchlistStock);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Add sector leader
router.post('/sector-leader', async (req, res) => {
  try {
    const sectorLeader = new SectorLeader(req.body);
    await sectorLeader.save();
    res.status(201).json(sectorLeader);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Get all stock positions
router.get('/positions', async (req, res) => { try {
    const positions = await StockPosition.find();
    res.json(positions);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.get('/agg-position', async (req, res) => {
  try {
    const positions = await LivePosition.find();
    res.json(positions);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});
// Get all watchlist stocks
router.get('/watchlist', async (req, res) => {
  try {
    const watchlistStocks = await WatchlistStock.find();
    res.json(watchlistStocks);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Get all sector leaders
router.get('/sector-leaders', async (req, res) => {
  try {
    const sectorLeaders = await SectorLeader.find();
    res.json(sectorLeaders);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.post('/close-position',async(req:Request,res:Response) => {
  console.log(req.body)
  try{
    const {purchase_price,
      sell_price,
      quantity,
      symbol, 
      exit_date,
      
    } = req.body;
    const pNl = (sell_price - purchase_price) * quantity;

    const tradeHistory = new TradeHistory({purchase_price,sell_price,quantity,symbol,exit_date,pNl})
    console.log(tradeHistory)

    await tradeHistory.save()

    const livePosition = await LivePosition.findOne({symbol})
    if(!livePosition){
      throw new Error("live position not found")

    }
    if(livePosition.quantity < quantity) {
      throw new Error ("not enough quantity to exit")
    }


    const updatedLiveQuantity = await LivePosition.findOneAndUpdate(
      {symbol},
      {$inc: {quantity: - quantity}},
      {new: true}
    ) 

    console.log(updatedLiveQuantity)

    res.status(201).json({message:'Saved Trade History', tradeHistory})

  }catch(e){
    res.status(400).json({message:(e)})
  
  }

})

export default router;
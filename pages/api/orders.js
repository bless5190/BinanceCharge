// pages/api/orders.js
import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const orders = await binance.openOrders(false); // false: todas as ordens abertas
    const closed = await binance.trades("USDTBRL"); // exemplo: pega histórico de trades do par

    console.log("🔍 Ordens abertas:", orders);
    console.log("✅ Trades realizados:", closed);

    res.status(200).json({ openOrders: orders, recentTrades: closed });
  } catch (error) {
    console.error("Erro ao buscar ordens:", error);
    res.status(500).json({ error: "Erro ao buscar ordens" });
  }
}

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = '3001';

const app = express();
app.use(express.json())
app.use(cors());

app.get('/kline', async(req, res, next)=>{

	const { symbol, interval }= req.query;
	if(!symbol || !interval) return res.status(422).send('symbol e interval sao obrigatorios');

	try {
		const response = await axios.get(`http://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=60`);
		res.json(response.data);

	} catch (err) {

		res.status(500).json(err.response ? err.response.data : err.massage);
	}
});

app.listen(PORT,()=>{
	console.log('Server running');
})
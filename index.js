const express = require('express');
const app = express();
const port = process.env.PORT || 8000 
const data = require('./data.json');

app.use(require('cors')({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('morgan')('dev'));

app.get('/data', async (req, res) => {
	const { pageNumber = 1, pageSize = 5 } = req.query;
	const pageIdx = parseInt(pageNumber, 10);
	const sizeIdx = parseInt(pageSize, 10);
	const startIndex = (pageIdx - 1) * sizeIdx;
	const endIndex = startIndex + sizeIdx;
	const dataToReturn = data.slice(startIndex, endIndex);
	return res.status(200).json({ data: dataToReturn, length: data.length });
});

app.listen(port, () => {
	console.log('Server started on port 8000');
})
	.on('error', (err) => {
		console.log(err);
	})
	.on('listening', () => {
		console.log('Server is listening on port 8000');
	});

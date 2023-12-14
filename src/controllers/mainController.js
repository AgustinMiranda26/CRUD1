const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		console.log(products)
		const inDiscount= products.filter (product => product.discount > 0)
		console.log (inDiscount)
		const visited= products.filter( product=> product.category== "visited")
		res.render('index.ejs', {inDiscount, visited})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
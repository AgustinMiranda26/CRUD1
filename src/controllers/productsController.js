const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products.ejs', {products})
	},
	
	// Detail - Detail from one product
	detail: (req, res) => {
		const pSelected= products.find(product => product.id == req.params.id)
		res.render ('detail.ejs', {pSelected})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form.ejs')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//creacion de nuevo producto del formulario con req.body
		const newProduct= {
			id: uuidv4(), //id unico
			...req.body, //spread operator
			image: 'not-image-product.png'  //imagen por defecto
		}										
		products.push(newProduct) //insertamos el nuevo objeto al listado 
		//convertir a JSON
 		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '))
		//SOBREESCRIBIR EL JSON
		
		res.redirect('/products')
		
	},												

	// Update - Form to edit
	edit: (req, res) => {
		const productToEdit= products.find(product=> req.params.id == product.id)
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;
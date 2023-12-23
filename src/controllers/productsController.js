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
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
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
		console.log(req.file);
		const newProduct= {
			id: uuidv4(), //id unico
			...req.body, //spread operator
			image: req.file?.filename || 'not-image-product.png', //imagen por defecto
			...req.body //spread operator
		}										
		products.push(newProduct) //insertamos el nuevo objeto al listado 
		//convertir a JSON-SOBREESCRIBIR EL JSON
 		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '))
	
		
		res.redirect('/products')
		
	},												

	// Update - Form to edit
	edit: (req, res) => {
		const productToEdit= products.find(product=> req.params.id == product.id)
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		//JSON DE PRODUCTOS
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//BUSCA LOS PRODUCTOS A EDITAR
		const productToEdit= products.find(product=> req.params.id == product.id)
		
		//ACCTUALIZACION O NO DE CADA ITEM DEL PRODUCTO
		productToEdit.name= req.body.name || productToEdit.name
		productToEdit.price= req.body.price || productToEdit.price
		productToEdit.discount= req.body.discount || productToEdit.discount
		productToEdit.category= req.body.category || productToEdit.category
		productToEdit.description= req.body.description || productToEdit.description
		productToEdit.image= req.file?.filename || productToEdit.image
		
		
		//ESCRIBE EL NUEVO JSON CON LOS CAMBIOS
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '))
		res.redirect('/products')
	},


	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id= req.params.id
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect('/products/')
		let newProducts= products.filter(product => product.id != id)
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts, null , ' '))
	}
};

module.exports = controller;
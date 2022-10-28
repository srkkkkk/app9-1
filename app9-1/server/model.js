const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')   //à¸ªà¸³à¸«à¸£à¸±à¸šà¹à¸šà¹ˆà¸‡à¹€à¸žà¸ˆ

mongoose.connect('mongodb://0.0.0.0:27017/db1', {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(result => console.log('Connection OK'))
.catch(err => console.log(err))

let productSchema = new mongoose.Schema({
	name: String,
	price: Number,
    detail: String,
	date_added: Date
})

productSchema.plugin(paginate)			//à¸ªà¸³à¸«à¸£à¸±à¸šà¹à¸šà¹ˆà¸‡à¹€à¸žà¸ˆ

let Product = mongoose.model('Product', productSchema)

module.exports = Product

const express = require('express')
const app = express()
const Product = require('./model')
const port = 8000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/api/db/create', (request, response) => {
    let form = request.body
    let data = {
        name: form.name || '', 
        price: form.price || 0, 
        detail: form.detail || '',
        date_added: new Date(Date.parse(form.date_added)) || new Date()
    }

    Product.create(data, err => {
        if (!err) { 
            console.log('document saved')
            response.send(true) 
        } else {
            console.log(err)
            response.send(false) 
        }  
    })
})

app.get('/api/db/read', (request, response) => {
    Product
    .find()     
    .exec((err, docs) => {
        response.json(docs)
    })
})

app.post('/api/db/update', (request, response) => {
    let form = request.body
    let data = {
        name: form.name || '', 
        price: form.price || 0, 
        detail: form.detail || '',
        date_added: new Date(Date.parse(form.date_added)) || new Date()
    }

	Product
	.findByIdAndUpdate(form._id, data, { useFindAndModify: false })
	.exec(err => {
        if (err) {
            response.json({error: err})
            return
        }
    })	
    	
    //à¸«à¸¥à¸±à¸‡à¸à¸²à¸£à¸­à¸±à¸›à¹€à¸”à¸• à¸à¹‡à¸­à¹ˆà¸²à¸™à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸­à¸µà¸à¸„à¸£à¸±à¹‰à¸‡ à¹à¸¥à¹‰à¸§à¸ªà¹ˆà¸‡à¹„à¸›à¹à¸ªà¸”à¸‡à¸œà¸¥à¸—à¸µà¹ˆà¸à¸±à¹ˆà¸‡à¹‚à¸¥à¸„à¸­à¸¥à¹à¸—à¸™à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¹€à¸”à¸´à¸¡
    Product
    .find()     
    .exec((err, docs) => {
        response.json(docs)
    })
})

app.post('/api/db/delete', (request, response) => {
    let _id = request.body._id

	Product
	.findByIdAndDelete(_id, { useFindAndModify: false })
	.exec(err => {
        if (err) {
            response.json({error: err})
            return
        }
    })		

    Product
    .find()     
    .exec((err, docs) => {
        response.json(docs)
    })
})

app.get('/api/db/paginate', (request, response) => {
	let options = {
		page: request.query.page || 1,     //à¹€à¸žà¸ˆà¸›à¸±à¸ˆà¸ˆà¸¸à¸šà¸±à¸™
		limit: 2     //à¹à¸ªà¸”à¸‡à¸œà¸¥à¸«à¸™à¹‰à¸²à¸¥à¸° 2 à¸£à¸²à¸¢à¸à¸²à¸£ (à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸¡à¸µà¸™à¹‰à¸­à¸¢)            
	}

	Product.paginate({}, options, (err, result) => {
        response.json(result)
    })
})

app.get('/api/db/search', (request, response) => {
    let q = request.query.q || ''

    //à¸à¸£à¸“à¸µà¸™à¸µà¹‰à¹ƒà¸«à¹‰à¸à¸³à¸«à¸™à¸” pattern à¸”à¹‰à¸§à¸¢ RegExp à¹à¸—à¸™à¸à¸²à¸£à¹ƒà¸Šà¹‰ / /
    let pattern = new RegExp(q, 'ig')   

    //à¸ˆà¸°à¸„à¹‰à¸™à¸«à¸²à¸ˆà¸²à¸à¸Ÿà¸´à¸¥à¸”à¹Œ name à¹à¸¥à¸° detail
    let conditions = {$or: [        
                        {name: {$regex: pattern}}, 
                        {detail: {$regex: pattern}}
                     ]}	

    let options = {
		page: request.query.page || 1,     //à¹€à¸žà¸ˆà¸›à¸±à¸ˆà¸ˆà¸¸à¸šà¸±à¸™
		limit: 2     //à¹à¸ªà¸”à¸‡à¸œà¸¥à¸«à¸™à¹‰à¸²à¸¥à¸° 2 à¸£à¸²à¸¢à¸à¸²à¸£ (à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸¡à¸µà¸™à¹‰à¸­à¸¢)               
	}

	Product
	.paginate(conditions, options, (err, result) => {
        response.json(result)
    })
})

app.listen(port, () => {
	console.log('Server listening on port ' + port)
})

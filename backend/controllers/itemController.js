const Items = require('../models/itemModel')
const Comments = require('../models/commentModel')     //we have a separate schema/ separate collection called comments which we use to create commemts so we import/ require Comments here 
// const items = require('../models/items')

module.exports.seed = async (req, res) => {
    await Items.deleteMany({})
    await Items.create(items)
    res.redirect('/items')
}

module.exports.index = async (req, res) => {
    const items = await Items.find().sort({ createdAt: 1 })
    res.render('items/Index', { items })
}

module.exports.new = async (req, res) => {
    res.render('items/New')
}

module.exports.delete = async (req, res) => {
    // first find the item, store it in a variable, then delete it from database
    const item = await Items.findByIdAndDelete(req.params.id)
    // delete all comments where the comment id 
    await Comments.deleteMany({ _id: { 
        // equals/matches any comment ids in this array
        $in: item.comments 
    }})
    res.redirect('/items')
}

module.exports.update = async (req, res) => {

    if (req.body.itemIsDamaged) {
        req.body.itemIsDamaged = true
    } else {
        req.body.itemIsDamaged = false
    }

    await Items.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/items/${req.params.id}`)
}

module.exports.create = async (req, res) => {
    console.log(req.body)

    if (req.body.itemIsDamaged) {
        req.body.itemIsDamaged = true
    } else {
        req.body.itemIsDamaged = false
    }


    try {
        await Items.create(req.body)
        res.redirect('/items')
    } catch(err) {
        res.send(err.message)
    }
}

module.exports.edit = async (req, res) => {
    const item = await Items.findById(req.params.id)
    console.log(item)
    console.log('edit route')
    res.render('items/Edit', { item })
}

module.exports.show = async (req, res) => {
    // const item = await Items.findById(req.params.id)
    // console.log(item)    
    // await item.populate('comments') 
    // console.log(item) 

    if (req.body.itemIsDamaged) {
        req.body.itemIsDamaged = true
    } else {
        req.body.itemIsDamaged = false
    }

    // populate replaces the ids with actual documents/objects we can use
    const item = await Items.findById(req.params.id).populate('comments')
    res.render('items/Show', { item })
}
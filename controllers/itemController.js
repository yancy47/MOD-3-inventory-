const Items = require('../models/itemModel')
const Comments = require('../models/commentModel')     //we have a separate schema/ separate collection called comments which we use to create commemts so we import/ require Comments here 
const items = require('../models/items')

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


// EXTRA LOGIC (for comments)

module.exports.createComment = async (req, res) => {
    // Alternative to Comments.create():
    // const comment = new Comments(req.body)
    // comment.save()

    // create a document in our comments collection
    const comment = await Comments.create(req.body)    
    // find the item 
    await Items.findByIdAndUpdate(req.params.id, {     
        // and push the new comment document's id
        $push: { 
            // to the item's comments field/property
            comments: comment._id  
        }
    })
    res.redirect(`/items/${req.params.id}`)
}

module.exports.deleteComment = async (req, res) => {
    // first use the id to delete the comment from the comments collection
    await Comments.findByIdAndDelete(req.params.cid)
    // then use the item's id to find the item
    await Items.findByIdAndUpdate(req.params.id, {
        // and pull/remove the reference id (to the comment) from
        $pull: {
            // the comments array
            comments: req.params.cid
        }
    })
    res.redirect(`/items/${req.params.id}`)
}

module.exports.indexComment = async (req, res) => {
    // target the comments property 
    const item = await Items.findById(req.params.id).populate('comments')
    res.send(item.comments)
}

module.exports.showComment = async (req, res) => {
    // find the item and filter it's comments property array
    const comment = await Comments.findById(req.params.cid)
    res.render('comments/Edit', { itemId: req.params.id, comment })
}

module.exports.updateComment = async (req, res) => {
    // update a comment by updating an item in the comments property in item
    await Comments.findByIdAndUpdate(req.params.cid, req.body)
    res.redirect(`/items/${req.params.id}`)
}
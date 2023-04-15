const Items = require('../models/itemModel')
const Comments = require('../models/commentModel') 

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
const express = require('express')

const PostRouter = express.Router()

const DBmethods = require('./data/db')

PostRouter.get('/',(req,res) => {
    DBmethods.find()
        .then(posts => {
            res.status(200).json({posts})
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
    
    
})

PostRouter.get('/:id', (req,res) => {
    const post = DBmethods.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json({post})
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
       
})

PostRouter.delete('/:id',(req,res) => {
    DBmethods.remove(req.params.id)
        .then(posts => {
            res.status(200).json({message: 'deleted!'})
        })
        .catch(err => {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        
})

PostRouter.post('/',(req,res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        DBmethods.insert(req.body)
            .then(posts => {
                res.status(200).json({message: 'post added!'})
            })
            .catch( err => {
                console.log(err)
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

PostRouter.post('/:id/comments',(req,res) => {
    if(!req.body.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        const comment = req.body
        comment.post_id = req.params.id
        DBmethods.insertComment(comment)
            .then(resp => {
                res.status(201).json({resp})
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }

})

PostRouter.get('/:id/comments',(req,res) => {
    DBmethods.findPostComments(req.params.id)
        .then(comments => {
            res.status(200).json({comments})
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

PostRouter.put('/:id',(req,res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        DBmethods.update(req.params.id, req.body)
            .then(resp => {
                res.status(200).json({resp})
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }


})



module.exports = PostRouter
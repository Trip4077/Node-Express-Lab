const express = require('express');
const db = require('../data/db');
const router = express.Router();

//CREATE
router.post('/', async (req,res) => {
    try {
        const post = req.body;

        if(post.title && post.contents) {
            const posted = await db.insert(post);
            const newPost = await db.findById(posted.id)
            res.status(201).json(newPost[0]);
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
}) 

//READ
router.get('/', async (req,res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
})

router.get('/:id', async (req,res) => {
    try {
        const post = await db.findById(req.params.id)
        
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch(error) {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
})

//UPDATE
router.put('/:id', async (req,res) => {
    try {
        const post = req.body;
        const id = req.params.id; 
        
        if(post.contents && post.title) {
            const update = await db.update(id, post); 
            const updatedPost = await db.findById(id) 
            if(update) {
                res.status(200).json(updatedPost[0])
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }

    } catch(error) {
        res.status(500).json({ error: "The post information could not be modified." });
    }
})

//DELETE
router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id; 
        
        const deletedPost = await db.findById(id) 
        const deleted = await db.remove(id); 
        
        if(deleted) {
            res.status(200).json(deletedPost[0])
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch(error) {
        res.status(500).json({ error: "The post could not be removed" });
    }
})

module.exports = router;
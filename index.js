const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const db = require('./data/db');

const server = express();
const PORT = '5000';

server.use(express.json());

server.post('/api/posts', async (req,res) => {
    try {
        const post = req.body;

        if(post.title && post.contents) {
            const posted = await db.insert(post);
            res.json(posted);
        } else {
            res.status(500).json({ message: 'Invalid Data'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding post'});
    }
}) 

server.get('/api/posts', async (req,res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting posts'});
    }
})

server.get('/api/posts/:id', async (req,res) => {
    try {
        const post = await db.findById(req.params.id)
        
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting post'});
    }
})

server.listen(PORT, () => {
    console.log(`\nServer listening on port:${PORT}\n`);
});


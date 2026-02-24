const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author', 'name');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');
        if (blog) res.json(blog);
        else res.status(404).json({ message: 'Blog not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const blog = await Blog.create({ title, content, image, author: req.user._id });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            blog.image = req.body.image || blog.image;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };

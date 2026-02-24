const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, authorize('Super Admin'), createBlog);
router.put('/:id', protect, authorize('Super Admin'), updateBlog);
router.delete('/:id', protect, authorize('Super Admin'), deleteBlog);

module.exports = router;

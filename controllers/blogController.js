const Blog = require('../models/blogs');

exports.createBlog = async (req, res) => {
  try {
    const { title, image, description, categoryId, authorId } = req.body;

    // Log category and author IDs for debugging
    console.log(`Creating blog with categoryId: ${categoryId}, authorId: ${authorId}`);

    const blog = new Blog({ title, image, description, category: categoryId, author: authorId });

    console.log(blog); // Log the entire blog object before saving

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs with populated category and author
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('category', 'name') // Populate category and select only name field
      .populate('author', '-password'); // Populate author and exclude password field

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID with populated category and author
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate('category', 'name') // Populate category and select only name field
      .populate('author', '-password'); // Populate author and exclude password field
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog by ID
exports.updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, categoryId, authorId } = req.body;
    const updatedBlog = { title, image, description, category: categoryId, author: authorId };
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
      .populate('category', 'name') // Populate category and select only name field
      .populate('author', '-password'); // Populate author and exclude password field
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

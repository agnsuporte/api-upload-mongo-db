const Blog = require("../models/blog");

module.exports = {
  async index(request, response) {
    return response.json({});
  },

  async create(request, response) {
    const { title, author, body, comments, date, hidden } = request.body;

    const data = {
      title,
      author,
      body,
      comments,
      date,
      hidden,
    };

    const blog = new Blog(data);

    try {
      const newBlog = await blog.save();

      if (newBlog) {
        response.status(200).json({
          _id: newBlog.id,
          title: newBlog.title,
        });
      } else {
        response.status(401).json({ message: "Invalid Data." });
      }
      
    } catch (err) {
      response.status(401).json({ err });
    }
  },
};

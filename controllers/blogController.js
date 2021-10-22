// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

export const blog_index = (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => res.render("index", { title: "All Blogs", blogs: result }))
		.catch((err) => console.log(err));
};

export const blog_details = (req, res) => {
	const { blogId } = req.params;

	Blog.findById(blogId)
		.then((result) => {
			res.render("details", { title: "Blog details", blog: result });
		})
		.catch((err) => console.log("check err in fetching data", err));
};

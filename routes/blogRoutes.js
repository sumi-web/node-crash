import express from "express";
import { Blog } from "../models/blog.js";
import { blog_index, blog_details } from "../controllers/blogController.js";
const router = express.Router();

//mongoose and mongo sandbox routes
router.get("/add-blog", (req, res) => {
	//create new instance of a blog document then save that ton blogs collection inn the database

	// we are using model to create a new instance of a blog document within the code
	const blog = new Blog({
		title: "new blog",
		snippet: "about my new blog",
		body: "more about my new blog",
	});

	blog
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log("error in saving", err);
		});
});

router.get("/all-blog", (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log("err found in getting all blogs", err));
});

router.get("/single-blog", (req, res) => {
	Blog.findById("61719c0302b43e3f931002a6")
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log("getting error in getting single blog"));
});

// blogs route

router.get("/", (req, res) => {});

router.get("/create", (req, res) => {
	res.render("create", { title: "Home" });
});

router.post("/create", (req, res) => {
	const blog = new Blog(req.body);
	blog
		.save()
		.then((result) => res.redirect("/blogs"))
		.catch((err) => console.log("err in saving", err));
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => {});
});

router.get("/:blogId", blog_details);

export default router;

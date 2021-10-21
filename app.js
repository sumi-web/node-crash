import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { Blog } from "./models/blog.js";

// express app
const app = express();

// connect to mongoDb
const dbURI = "mongodb+srv://sumiBoi:sumi1234@nodetuts.llcwi.mongodb.net/nodeTuts?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true })
	.then((res) => {
		console.log("mongoDb connected", res);
		app.listen(3000, () => {
			console.log("server connected");
		});
	})
	.catch((err) => {
		console.log("err in connecting mongoDb", err);
	});

app.set("view engine", "ejs");

const blogs = [
	{
		title: "Yoshi finds eggs",
		snippet: "	Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		title: "mario finds stars",
		snippet: "	Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		title: "how to defeat browser",
		snippet: "	Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
];

//middleware and static files
app.use(express.static("public"));

app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
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

app.get("/all-blog", (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log("err found in getting all blogs", err));
});

app.get("/single-blog", (req, res) => {
	Blog.findById("61719c0302b43e3f931002a6")
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log("getting error in getting single blog"));
});

app.get("/", (req, res) => {
	res.redirect("/blogs");
	// res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "Home", blogs });
});

// blogs route

app.get("/blogs", async (req, res) => {
	const result = await Blog.find().sort({ createdAt: -1 });
	res.render("index", { title: "All Blogs", blogs: result });
	// res.send(result);
});

app.get("/blogs/create", (req, res) => {
	res.render("create", { title: "Home" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

import express from "express";
const app = express();

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

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "Home", blogs });
});

app.get("/blogs/create", (req, res) => {
	res.render("create", { title: "Home" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

app.listen(3000, () => {
	console.log("server connected");
});

import express from "express";
import morgan from "morgan";
const app = express();

// connect to mongoDb
const dbURI = "mongodb+srv://sumiBoi:sumi1234@nodetuts.llcwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

app.use(morgan("tiny"));

app.get("/", (req, res) => {
	console.log("inside route");
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

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

app.listen(3000, () => {
	console.log("server connected");
});

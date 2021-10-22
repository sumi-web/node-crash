import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import blogRoutes from "./routes/blogRoutes.js";

// express app
const app = express();

// connect to mongoDb
const dbURI = "mongodb+srv://sumiBoi:sumi1234@nodetuts.llcwi.mongodb.net/nodeTuts?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true })
	.then((res) => {
		console.log("mongoDb connected");
		app.listen(3000, () => {
			console.log("server connected");
		});
	})
	.catch((err) => {
		console.log("err in connecting mongoDb", err);
	});

app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//blog routes

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "Home" });
});

// it will only gonna apply blogRoutes when we go to /blogs
// only start this blogRoutes when routing start with "/blogs"
app.use("/blogs", blogRoutes);

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "Home" });
});

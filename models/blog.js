import mongoose from "mongoose";
const { Schema, model } = mongoose;

// using schema constructor function
const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		snippet: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
);

// model is an interface which provides communication to database collection from that doc type

export const Blog = model("Blog", blogSchema);

import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import open from "open";
import { error } from "console";
import { title } from "process";

dotenv.config();

const app : Express = express();

app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/home", (req, res) => {
  res.render("home", { 
    title: "home",
    message: "Welcome to the Home Page",
  });
});

app.get("/autoMerken", (req, res) => {
  res.render("autoMerken", { 
    title: "autoMerken",
    message: "Welcome to the AutoMerk Page",
  });
});






app.listen(app.get("port"), () => {
    // const url = `http://localhost:${app.get("port")}/landing`;
    // console.log("Server started on ", url);
    // open(url);

    console.log("Server started on http://localhost:" + app.get("port"));
});
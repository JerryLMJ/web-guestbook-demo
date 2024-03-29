// import http, { request } from "http";
// import path from "path";
// import express from "express";
// import logger from "morgan";
// import bodyParser from "body-parser";
var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

// init engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// global entries
var entries = [];
app.locals.entries = entries;

// use Morgan recode logs
app.use(logger("dev"));

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//
app.get("/", (request, response) => {
  response.render("index");
});
app.get("/new-entry", (request, response) => {
  response.render("new-entry");
});
app.post("/new-entry", (request, response) => {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });

  response.redirect("/");
});

app.use((request, response) => {
  response.status(404).render("404");
});

http.createServer(app).listen(3000, () => {
  console.log("Guestbook app started on port 3000.");
});

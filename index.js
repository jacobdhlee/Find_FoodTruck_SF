#!/usr/bin/env node
const program = require("commander");
const { findRestaurants } = require("./method");

program.version("1.0.0").description("Find currently opened food truck in SF");

program.description("Find currently opened food truck in SF").action(() => {
  findRestaurants();
});
program.parse(process.argv);

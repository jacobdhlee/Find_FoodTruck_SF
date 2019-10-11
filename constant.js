// listed weekdays by number so can compare current day and restaurants open day
const WEEKDAYS = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0
};

//table head
const HEAD = ["", "NAME", "ADDRESS"];
//table size
const COLWIDTHS = [10, 80, 30];
//table outline
const CHARS = {
  top: "═",
  "top-mid": "╤",
  "top-left": "╔",
  "top-right": "╗",
  bottom: "═",
  "bottom-mid": "╧",
  "bottom-left": "╚",
  "bottom-right": "╝",
  left: "║",
  "left-mid": "╟",
  mid: "─",
  "mid-mid": "┼",
  right: "║",
  "right-mid": "╢",
  middle: "│"
};

module.exports = { WEEKDAYS, HEAD, CHARS, COLWIDTHS };

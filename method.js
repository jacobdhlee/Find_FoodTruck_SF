const moment = require("moment-timezone");
const axios = require("axios");
const Table = require("cli-table");
const inquirer = require("inquirer");
const { WEEKDAYS, HEAD, CHARS, COLWIDTHS } = require("./constant");

let count = 0;
let foodTruckLists = [];

//get data from data.sfgov.org
const findRestaurants = () => {
  axios
    .get("http://data.sfgov.org/resource/bbb8-hzi6.json")
    .then(resp => {
      filterRestaurant(resp.data);
    })
    .catch(err => console.log(`error is ${err}`));
};

// filtered data
const filterRestaurant = restaurantsList => {
  //get SF local time
  let currentTime = moment().tz("America/Los_Angeles").format("LT");
  let currentTimeNumber = changeTime(currentTime);
  let currentWeekday = moment().weekday();
  let filterRestaurantList = restaurantsList.filter(restaurant => {
    return (
      // check same day as today
      WEEKDAYS[restaurant.dayofweekstr] === currentWeekday &&
      //check current local time is in between start time and end time
      currentTimeNumber >= changeTime(restaurant.starttime) &&
      currentTimeNumber < changeTime(restaurant.endtime)
    );
  });
  sortRestaurantByName(filterRestaurantList);
};

const sortRestaurantByName = restaurants => {
  //sorted by alphabetically
  const sortedrestaurantList = restaurants.sort((a, b) =>
    a.applicant.localeCompare(b.applicant)
  );
  changeDataFormat(sortedrestaurantList);
};

//change data format for printing format
const changeDataFormat = restaurantList => {
  foodTruckLists = restaurantList.map((restaurant, i) => {
    return [i + 1, restaurant.applicant, restaurant.location];
  });
  printRestaurantList();
};

//print list;
const printRestaurantList = () => {
  //initial table
  let table = new Table({
    head: HEAD,
    colWidths: COLWIDTHS,
    chars: CHARS
  });
  if (foodTruckLists.length > 10) {
    table.push(...foodTruckLists.slice(count * 10, (count + 1) * 10));
  } else {
    table.push(...foodTruckLists.slice(count * 10, foodTruckLists.length));
  }
  console.log(table.toString());
  count += 1;
  //check if there are more lists of food truck
  if (count * 10 < foodTruckLists.length) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "show_more_list",
          message: "Press y or Y to see more food truck list",
          prompts: [
            {
              type: "input",
              name: "answer",
              message: "Food truck list"
            }
          ]
        }
      ])
      .then(answer => {
        //user answer is only Y or y then call print next page
        if (answer.show_more_list.toLowerCase() === "y") {
          printRestaurantList();
        } else {
          //if user did not enter anything or press wrong button
          console.log("If you want to see again");
          console.log("Please enter again below : show-open-food-trucks");
        }
      });
  } else {
    console.log("There are no more food truck list currently open");
  }
};

//change time to float numberex) 10AM => 10, 10PM -> 22
const changeTime = time => {
  let timeNumber = Number(
    time.substring(0, time.length - 2).split(":").join(".")
  );
  if (time.substring(time.length - 2) === "PM") {
    //when time is between 12 and 12.59 => not add 12
    return Math.floor(timeNumber) === 12 ? timeNumber : timeNumber + 12;
  }
  //when time is between 12 and 12.59 => add 12
  return Math.floor(timeNumber) === 12 ? timeNumber - 12 : timeNumber;
};

module.exports = {
  findRestaurants
};

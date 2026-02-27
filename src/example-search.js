// Example search parameters for Star Hotel API

const exampleSearch = {
  originQuery: "Find 3-star hotels in Zhengzhou, check-in on February 26th, budget under 200 yuan",
  place: "Zhengzhou",
  placeType: "city",
  checkInDate: "2026-02-26",
  stayNights: 1,
  adultCount: 2,
  childCount: 0,
  roomCount: 1,
  starRatings: [3.0],
  hotelTags: {
    maxPricePerNight: 200
  },
  size: 5,
  queryParsing: true,
  language: "zh_CN",
  countryCode: "CN"
};

const shanghaiBundSearch = {
  originQuery: "Help me find hotels near Shanghai Bund, check-in on March 1st for 2 nights, budget under 1000",
  place: "Bund",
  placeType: "scenic spot",
  checkInDate: "2026-03-01",
  stayNights: 2,
  hotelTags: {
    maxPricePerNight: 1000,
    preferredTags: ["Free WiFi"]
  },
  size: 5
};

console.log("Hotel search example parameters:");
console.log(JSON.stringify(exampleSearch, null, 2));
console.log("\nShanghai Bund search example parameters:");
console.log(JSON.stringify(shanghaiBundSearch, null, 2));

module.exports = {
  exampleSearch,
  shanghaiBundSearch
};

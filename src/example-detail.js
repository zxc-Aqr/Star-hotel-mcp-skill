// Example hotel detail query parameters for Star Hotel API

const exampleDetail = {
  hotelId: 43615,
  name: "Youdi Movie Hotel (Zhengzhou Miaoli Commercial Center Ocean Park Branch)",
  checkInDate: "2026-02-26",
  checkOutDate: "2026-02-27",
  adultCount: 2,
  childCount: 0,
  roomCount: 1,
  countryCode: "CN",
  currency: "CNY"
};

console.log("Hotel detail query example parameters:");
console.log(JSON.stringify(exampleDetail, null, 2));

module.exports = exampleDetail;

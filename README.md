# Hotel MCP Project

Smart hotel search project based on Star Hotel MCP

## Project Structure

```
Hotel mcp/
├── .trae/
│   └── skills/
│       └── star-hotel/          # Trae IDE skill files
├── src/
│   ├── example-search.js         # Search example
│   └── example-detail.js         # Detail query example
├── mcp.json                      # MCP server configuration
├── package.json                  # Project configuration
└── README.md                     # Project documentation
```

## Features

- 🔍 Hotel Search: Filter by location, date, star rating, and budget
- 🏨 Hotel Details: View room types and prices
- 🏷️ Tag Filtering: Get available filter tags
## Documentation Version

This document has been updated according to the latest online aigohotel-mcp tool results (Update date: 2026-02-11).

## MCP Configuration

The project has configured the Star Hotel MCP server:

```json
{
  "mcpServers": {
    "aigohotel-mcp": {
      "url": "https://mcp.aigohotel.com/mcp",
      "type": "http",
      "headers": {
        "Authorization": "Bearer mcp_a84000de01e04920b3690d173630f163"
      }
    }
  }
}
```

## Tool Instructions

### 1. searchHotels - Search Hotels

#### Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| originQuery | User's original query (sensitive information filtered) | Yes | "Find 3-star hotels in Zhengzhou" |
| place | Location name, as detailed as possible (city/airport/scenic spot/detailed address, etc.) | Yes | Zhengzhou, Miaoli Commercial Center, Ocean Park |
| placeType | Location type | Yes | city/airport/scenic spot/railway station/subway station/hotel/district/county/detailed address |
| queryParsing | Whether to parse user's natural language preferences, default true | No | true |
| checkInDate | Check-in date, format YYYY-MM-DD. If not provided or earlier than today, "tomorrow" is automatically used | No | 2026-02-26 |
| stayNights | Number of nights, default 1 | No | 1 |
| adultCount | Number of adults per room, default 2 | No | 2 |
| countryCode | Country two-letter code (ISO 3166-1) | No | CN |
| distanceInMeter | Straight-line distance from POI (meters), default 5000 for POI scenarios | No | 5000 |
| starRatings | Star rating range, default [0.0, 5.0], step 0.5 | No | [3.0] |
| size | Number of hotels to return, default 5, maximum 20 | No | 5 |
| withHotelAmenities | Whether to include hotel amenities information | No | true |
| language | Language environment, default zh_CN | No | zh_CN |
| hotelTags | Tag/brand/budget filtering | No | See below for details |

#### hotelTags Sub-fields

| Field | Description |
|-------|-------------|
| preferredTags | Preferred tags (string[]) |
| requiredTags | Must-have tags (strong constraint, string[]) |
| excludedTags | Excluded tags (string[]) |
| preferredBrands | Preferred brands (string[]) |
| maxPricePerNight | Maximum price per night (CNY, number) |
| minRoomSize | Minimum room size (square meters, number) |

#### Usage Example

```javascript
const searchParams = {
  originQuery: "Find 3-star hotels in Zhengzhou, check-in on February 26th, budget under 200 yuan",
  place: "Zhengzhou",
  placeType: "city",
  checkInDate: "2026-02-26",
  stayNights: 1,
  adultCount: 2,
  starRatings: [3.0],
  hotelTags: {
    maxPricePerNight: 200
  },
  size: 5
};
```

Run example:
```bash
node src/example-search.js
```

#### Output Structure

```json
{
  "message": "Hotel search successful",
  "hotelInformationList": [
    {
      "hotelId": 43615,
      "bookingUrl": "Booking link",
      "name": "Hotel name",
      "brand": "Brand",
      "address": "Hotel location",
      "starRating": 5.0,
      "price": {
        "message": "Price check successful, lowest price: 626.0, currency: CNY",
        "hasPrice": true,
        "currency": "CNY",
        "lowestPrice": 626.0
      },
      "hotelAmenities": ["24-hour front desk", "WIFI"],
      "tags": ["Near shopping mall", "Free WiFi"]
    }
  ]
}
```

### 2. getHotelDetail - Get Hotel Details

#### Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| hotelId | Hotel ID, choose one with name, if both are provided, hotelId is preferred | No | 43615 |
| name | Hotel name (fuzzy matching), choose one with hotelId | No | "Youdi Movie Hotel" |
| checkInDate | Check-in date, format YYYY-MM-DD. If empty/invalid format/earlier than today, "tomorrow" is automatically used | No | 2026-02-26 |
| checkOutDate | Check-out date, format YYYY-MM-DD. If empty/invalid format/not later than check-in date, checkInDate + 1 day is automatically used | No | 2026-02-27 |
| adultCount | Number of adults per room, default 2 | No | 2 |
| childCount | Number of children per room, default 0 | No | 0 |
| childAgeDetails | Children's age list | No | [3, 5] |
| roomCount | Number of rooms, default 1 | No | 1 |
| countryCode | Country two-letter code, default CN | No | CN |
| currency | Currency, default CNY | No | CNY |

#### Usage Example

```javascript
const detailParams = {
  hotelId: 43615,
  name: "Youdi Movie Hotel (Zhengzhou Miaoli Commercial Center Ocean Park Branch)",
  checkInDate: "2026-02-26",
  checkOutDate: "2026-02-27",
  adultCount: 2,
  roomCount: 1
};
```

Run example:
```bash
node src/example-detail.js
```

#### Output Structure

```json
{
  "success": true,
  "errorMessage": null,
  "hotelId": 43615,
  "bookingUrl": "Booking link",
  "name": "Beijing Tianlun Dynasty Hotel",
  "checkIn": "2026-03-05",
  "checkOut": "2026-03-06",
  "roomRatePlans": [
    {
      "roomTypeId": 4984714,
      "roomName": "Superior Room",
      "roomNameCn": "高级客房",
      "ratePlanId": "7012072001634754626",
      "ratePlanName": "Superior Room King Bed , 1 King Bed",
      "bedType": 73,
      "bedTypeDescription": "Unknown",
      "currency": "CNY",
      "totalPrice": 0,
      "totalSalesRate": null,
      "inventoryCount": null,
      "isOnRequest": null,
      "recommendIndex": null,
      "cancellationPolicies": [
        {
          "fromDate": "2026-03-02T10:00:00+08:00",
          "toDate": null,
          "amount": 634,
          "percent": null,
          "type": null,
          "description": null
        }
      ],
      "includedFees": null,
      "excludedFees": null,
      "metadata": null
    }
  ]
}
```

### 3. getHotelSearchTags - Get Filter Tags

No parameters needed, just call directly to get available filter tags.

#### Output Structure

```json
{
  "tags": [
    {
      "name": "Free WiFi",
      "category": "Core Facilities",
      "description": "Provides free WiFi"
    }
  ],
  "usageGuide": {
    "tagUsage": "Put tag names into hotelTags.preferredTags (preference), requiredTags (must-have) or excludedTags (exclude) lists",
    "exampleRequest": "{...}"
  }
}
```

## Notes

- Using the public API Key has rate limits
- For higher quotas, please apply for an exclusive Key: https://mcp.agentichotel.cn/apply
- Please avoid including personal sensitive information when searching
- originQuery parameter needs to filter out personal identification information
- starRatings uses 0.5 step format, such as [3.0]
- Budget is set through hotelTags.maxPricePerNight

## Related Resources

- [Star Hotel Official Website](https://mcp.aigohotel.com)
- [MCP Documentation](https://modelcontextprotocol.io/)

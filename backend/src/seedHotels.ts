import mongoose from "mongoose";
import Hotel from "./models/hotel";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const hotels = [
  {
    userId: "user1",
    name: "Ocean View Hotel",
    city: "Miami",
    country: "USA",
    description: "A beautiful ocean view hotel with luxury amenities.",
    type: "Resort",
    adultCount: 2,
    childCount: 2,
    facilities: ["Pool", "Spa", "WiFi", "Restaurant"],
    pricePerNight: 200,
    starRating: 5,
    imageUrls: ["/data/ocean1.jpg", "/data/ocean2.jpg"],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: "user2",
    name: "Mountain Retreat",
    city: "Aspen",
    country: "USA",
    description: "Peaceful retreat in the mountains for nature lovers.",
    type: "Lodge",
    adultCount: 2,
    childCount: 2,
    facilities: ["Hiking", "WiFi", "Fireplace", "Breakfast"],
    pricePerNight: 180,
    starRating: 4,
    imageUrls: ["/data/mountain1.jpg", "/data/mountain2.jpg"],
    lastUpdated: new Date(),
    bookings: [],
  },
];

async function seed() {
  try {
    await Hotel.deleteMany({});
    await Hotel.insertMany(hotels);
    console.log("Hotels seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();

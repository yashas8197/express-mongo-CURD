const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Restaurants = require("./models/restaurant.models");

app.use(express.json());

initializeDatabase();

/* const newRestaurant = {
  name: "Yo China",
  cuisine: ["Chinese", "Italian"],
  location: "MG Road, Bangalore",
  rating: 3.9,
  reviews: [],
  website: "https://yo-example.com",
  phoneNumber: "+1288997392",
  openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://yo-example.com/menu",
  photos: [
    "https://example.com/yo-photo1.jpg",
    "https://example.com/yo-photo2.jpg",
    "https://example.com/yo-photo3.jpg",
  ],
}; */

async function createData(newRestaurant) {
  try {
    const restaurant = new Restaurants(newRestaurant);
    const saveRestaurant = await restaurant.save();
    return saveRestaurant;
  } catch (error) {
    throw error;
  }
}

app.post("/restaurants", async (req, res) => {
  try {
    const savedRestaurant = await createData(req.body);
    res.status(200).json({
      message: "restaurant added successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function readAllRestaurants() {
  try {
    const allRestaurant = await Restaurants.find();
    return allRestaurant;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants", async (req, res) => {
  try {
    const movies = await readAllRestaurants();
    if (movies.length !== 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function readRestaurantByName(restaurantName) {
  try {
    const readResByName = await Restaurants.findOne({ name: restaurantName });
    return readResByName;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const movie = await readRestaurantByName(req.params.restaurantName);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

async function readResByPhoneNumber(phoneNumber) {
  try {
    const resPhoneNumber = await Restaurants.findOne({
      phoneNumber: phoneNumber,
    });
    return resPhoneNumber;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurant = await readResByPhoneNumber(req.params.phoneNumber);
    if (restaurant.length !== 0) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

async function readResByCuisines(cuisines) {
  try {
    const resByCuisine = await Restaurants.findOne({ cuisine: cuisines });
    return resByCuisine;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurant = await readResByCuisines(req.params.cuisineName);
    if (restaurant.length !== 0) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function readResByLocation(location) {
  try {
    const resByLocation = await Restaurants.findOne({ location: location });
    return resByLocation;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurant = await readResByLocation(req.params.restaurantLocation);
    if (restaurant.length !== 0) {
      res.json(restaurant);
      res.json(200).json({ message: "restaurant added successfully" });
    } else {
      res.status(404).json({ error: "restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function deleteRestaurant(resId) {
  try {
    const deleteRes = await Restaurants.findByIdAndDelete(resId);
    return deleteRes;
  } catch (error) {
    throw error;
  }
}

app.delete("/restaurants/:restaurantId", async (req, res) => {
  try {
    const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);
    res.status(200).json({ message: "deleted restaurant successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});

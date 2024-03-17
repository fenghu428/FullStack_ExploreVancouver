import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js"; 
import Place from "./models/Place.js"; 
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const bcryptSaltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

if (!jwtSecret) {
  console.error("JWT secret is not set. Exiting...");
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ credentials: true }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get('/api/places', async (req, res) => {
  const { category, search, ids } = req.query;

  try {
      let query = {};
      if (category) {
          query.category = category;
      }
      if (search) {
          query.title = { $regex: search, $options: 'i' };
      }
      if (ids) {
          const objectIdArray = ids.map(id => new mongoose.Types.ObjectId(id));
          query._id = { $in: objectIdArray };
      }

      const places = await Place.find(query);
      res.json(places);
  } catch (error) {
      console.error("Error in /api/places:", error);
      res.status(500).json({ message: error.message });
  }
});

app.get('/api/user/:userId/favorites', async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId).populate('favorites');
      if (!user) {
          return res.status(404).json('User not found');
      }

      res.json(user.favorites);
  } catch (e) {
      console.error("Error fetching favorites:", e);
      res.status(500).json({ message: "Error fetching favorites", error: e });
  }
});


app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json('Place not found');
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/user/:userId/favorites/:category', async (req, res) => {
  const { userId, category } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: 'favorites',
      match: { category: category }
    });

    if (!user) {
      return res.status(404).json('User not found');
    }

    res.json(user.favorites);
  } catch (e) {
    console.error("Error fetching favorites:", e);
    res.status(500).json({ message: "Error fetching favorites", error: e });
  }
});

app.post('/api/user/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(itemId)) {
      user.favorites.push(itemId);
      await user.save();
    }

    res.status(200).json({ message: "Favorite added successfully", favorites: user.favorites });
  } catch (e) {
    res.status(500).json({ message: "Error adding favorite", error: e });
  }
});

app.delete('/api/user/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(fav => !fav.equals(itemId));
    await user.save();

    res.status(200).json({ message: "Favorite removed successfully", favorites: user.favorites });
  } catch (e) {
    res.status(500).json({ message: "Error removing favorite", error: e });
  }
});


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSaltRounds);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json('User not found');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      const token = jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret);

      res.cookie('token', token).json(userDoc);
    } else {
      res.status(401).json('Invalid password');
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/account', async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json('No token provided');
  }

  try {
    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(404).json('User not found');
    }

    res.json({ name: user.name, email: user.email, _id: user._id });
  } catch (e) {
    res.status(401).json('Invalid token');
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


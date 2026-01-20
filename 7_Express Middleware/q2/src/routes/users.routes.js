import express from "express";
import fs from "fs";
import upload from "../middleware/upload.middleware.js";
import uniqueEmail from "../middleware/uniqueEmail.middleware.js";
import cloudinary from "../config/cloudinary.config.js";

const router = express.Router();
const dbPath = "./src/db.json";

// Read & write DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


router.post(
  "/signup",
  upload.single("profile"),   // Multer
  uniqueEmail,                // Email validation
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validate file
      if (!req.file) {
        return res.status(400).json({ error: "Profile image is required" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "users" },
        (error, cloudinaryResult) => {
          if (error) {
            return res.status(500).json({ error: "Cloudinary upload failed" });
          }

          // Save user to DB
          const db = readDB();
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            profilePic: cloudinaryResult.secure_url
          };

          db.users.push(newUser);
          writeDB(db);

          return res.status(201).json({
            message: "User registered successfully",
            user: newUser
          });
        }
      );

      // important: send file buffer to cloudinary stream
      result.end(req.file.buffer);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;

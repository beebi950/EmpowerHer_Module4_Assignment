import fs from "fs";

const dbPath = "./src/db.json";

const readDB = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

const uniqueEmail = (req, res, next) => {
  const { email } = req.body;
  const db = readDB();

  const exists = db.users.find((u) => u.email === email);

  if (exists) {
    return res.status(409).json({ error: "Email already exists" });
  }

  next();
};

export default uniqueEmail;

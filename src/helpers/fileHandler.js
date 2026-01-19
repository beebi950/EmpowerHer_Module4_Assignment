import fs from "fs";
import path from "path";

const dbPath = path.resolve("src/db.json");

// Read JSON File
export const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

// Write JSON File
export const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

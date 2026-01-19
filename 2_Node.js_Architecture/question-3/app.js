import os from "os";
import fs from "fs/promises";



// Part A – OS Module



console.log("----- OS Module Info -----");

// Free memory
console.log("Free Memory:", os.freemem(), "bytes");

// Total CPU cores
console.log("CPU Cores:", os.cpus().length);


// Part B – File System CRUD



async function fileOperations() {
  try {
    // 1. Create data.txt
    await fs.writeFile("data.txt", "Hello World");
    console.log("data.txt created");

    // 2. Create Readme.md
    await fs.writeFile("Readme.md", "## This is first line in Readme");
    console.log("Readme.md created");

    // 3. Read data.txt
    const data = await fs.readFile("data.txt", "utf-8");
    console.log("Content of data.txt:", data);

    // 4. Append to data.txt
    await fs.appendFile("data.txt", "\nThis is second line");
    console.log("Appended to data.txt");

    // 5. Delete Readme.md
    await fs.unlink("Readme.md");
    console.log("Readme.md deleted");

  } catch (err) {
    console.error("Error:", err.message);
  }
}


fileOperations();
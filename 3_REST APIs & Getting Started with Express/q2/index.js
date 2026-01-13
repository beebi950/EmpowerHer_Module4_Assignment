const express = require("express");
const os = require("os");
const dns = require("dns");

const readFileContent = require("./read");

const app = express();
const PORT = 3000;

// ========== TEST ROUTE ==========
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// ========== READFILE ROUTE ==========
app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileContent();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ========== SYSTEM DETAILS ROUTE ==========
app.get("/systemdetails", (req, res) => {
  const details = {
    platform: os.platform(),
    totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB",
    freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + " GB",
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length, // BONUS: CPU core count
  };

  res.json(details);
});

// ========== GET IP ROUTE ==========
app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: "DNS lookup failed" });
    } else {
      res.json({
        hostname: "masaischool.com",
        ipAddresses: addresses.map((a) => a.address), // BONUS: IPv4 + IPv6
      });
    }
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

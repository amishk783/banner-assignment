import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import sequelize from "./db"; // Assuming the sequelize instance is exported from 'db'
import Banner from "./model/banner"; // Assuming the Banner model is exported from 'models/banner'
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/banner/", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({ where: { id: 1 } });
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: "Error fetching banner data" });
  }
});

app.post("/banner", async (req: Request, res: Response) => {
  const { status, description, timer, link } = req.body;

  try {
    const newBanner = await Banner.create({
      description,
      link,
      status,
      timer,
    });

    res
      .status(201)
      .json({ message: "Banner created successfully", banner: newBanner });
  } catch (error) {
    res.status(500).json({ error: "Error creating banner" });
  }
});

app.put("/banner/", async (req: Request, res: Response) => {
  const { status, description, timer, link } = req.body;
  const { id } = req.params;
  try {
    const [updated] = await Banner.update(
      { status, description, timer, link },
      { where: { id: 1 } }
    );

    if (updated) {
      res.json({ message: "Banner updated successfully" });
    } else {
      res.status(404).json({ error: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating banner data" });
  }
});

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

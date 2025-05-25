import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/add-proverb", async (req, res) => {
  const { textDari, textPashto, translationEn, meaning, category } = req.body;
  try {
    await axios.post("http://localhost:3000/proverbs", {
      textDari,
      textPashto,
      translationEn,
      meaning,
      category,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error adding proverb.");
  }
});

app.post("/delete-proverb/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await axios.delete(`http://localhost:3000/proverbs/${id}`);
    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.send("Error deleting proverb.");
  }
});

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get("http://localhost:3000/proverbs");
//     const proverbs = response.data;
//     res.render("index", { proverbs });
//   } catch (err) {
//     console.error(err.message);
//     res.send("Error loading proverbs.");
//   }
// });

app.get("/edit-proverb/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/proverbs/${id}`);
    const proverb = response.data;
    res.render("edit", { proverb });
  } catch (err) {
    console.error(err.message);
    res.send("Error loading proverb for edit.");
  }
});

app.post("/edit-proverb/:id", async (req, res) => {
  const id = req.params.id;
  const { textDari, textPashto, translationEn, category, meaning } = req.body;

  try {
    await axios.put(`http://localhost:3000/proverbs/${id}`, {
      textDari,
      textPashto,
      translationEn,
      category,
      meaning,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.send("Error updating proverb.");
  }
});

app.get("/", async (req, res) => {
  const selectedCategory = req.query.category;
  try {
    const response = await axios.get("http://localhost:3000/proverbs");
    let proverbs = response.data;
    if (selectedCategory) {
      proverbs = proverbs.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    res.render("index", { proverbs });
  } catch (err) {
    console.error(err.message);
    res.send("Error loading provers.");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

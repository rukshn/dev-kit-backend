import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());

app.get("/", async (req, res) => {
  const url =
    "https://github.com/user-attachments/assets/5c946e12-acc2-47aa-adfb-f60c701c09b9";
  const options = {
    method: "GET",
    headers: {
      Authorization: "",
    },
  };

  try {
    const response = await fetch(url, options);
    const blob = await response.blob();
    res.type(blob.type);
    blob.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf));
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/url/", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "",
    },
  };

  const url = req.query.url;
  if (!url || url.length === 0) {
    return {};
  }
  try {
    const response = await fetch(url, options);
    const blob = await response.blob();
    res.type(blob.type);
    blob.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf));
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

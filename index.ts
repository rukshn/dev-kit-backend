import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = 3000;
app.use(cors());

dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.get("/login/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&login=swisstph&scope=repo&redirect=http://localhost:3000/auth/github/callback`,
  );
});

app.get("/auth/github/callback", function (req, res) {
  // Successful authentication, redirect home.
  console.log(req.query.code);
  const fetchToken = fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
    }),
  })
    .then((response) => response.json())
    .then((json) => res.json(json));
});

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

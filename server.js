const app = require("./config/app");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});

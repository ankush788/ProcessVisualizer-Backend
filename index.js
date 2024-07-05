const express = require("express");
var cors = require("cors");
const fcfsRouter = require("./Routes/fcfsRoute");
const sjfRouter = require("./Routes/sjfRoute");
const roundRobinRouter = require("./Routes/rrRoute");
const priorityRouter = require("./Routes/priorityRoute");  //  priority low to high 
const algoCompareRouter = require("./Routes/algoCompareRoute"); // using this require both things in data timeQuantum , priority 
const FRONTEND_URL = require("./urlConfig");
//  const connectToDatabase = require("./Config/database");
//  connectToDatabase();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  cors({
    origin: `${FRONTEND_URL}`,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("We are live ");
});

app.use("/fcfs" , fcfsRouter);
app.use("/sjf",  sjfRouter);
app.use("/rr", roundRobinRouter);
app.use("/priority", priorityRouter);
app.use("/compare", algoCompareRouter);

app.use((req, res) => {
  res.status(404).send("Wrong path");
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

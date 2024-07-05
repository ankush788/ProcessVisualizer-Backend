const express = require("express");
var cors = require("cors");
const fcfsRouter = require("./Routes/fcfsRoute");
const sjfRouter = require("./Routes/sjfRoute");
const roundRobinRouter = require("./Routes/rrRoute");
const priorityRouter = require("./Routes/priorityRoute");  //  priority low to high 
const algoCompareRouter = require("./Routes/algoCompareRoute"); // using this require both things in data timeQuantum , priority 
//  const connectToDatabase = require("./Config/database");
//  connectToDatabase();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({
  origin: 'https://your-client-domain.com', // Replace with your client's domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable if you need to send cookies or HTTP authentication
  allowedHeaders: 'Content-Type, Authorization'
}));

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

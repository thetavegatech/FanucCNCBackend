const express = require("express");
const sql = require("mssql/msnodesqlv8");
const config = require("./config/dbConfig");
const { getCNC1DataController, getLastCNC1DataController } = require("./Controllers/CNC1Controller");
const { getCNC1ProductionDataController, getLastCNC1ProductionDataController, getCurrentDayCNC1ProductionDataController, getLetestRejectedCountController } = require("./Controllers/cncProductionController");
const Breakdownroute = require("./Routes/BreakdownRoute")
const cors = require('cors')




const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api" , Breakdownroute)


// Connect to the database
sql.connect(config)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed:", err));

// Set up the route
app.get('/api/cnc1data', getCNC1DataController);
app.get('/api/cnc1letestrecord', getLastCNC1DataController);

//route for production 
app.get('/api/cnc1productiondata', getCNC1ProductionDataController);
app.get('/api/cnc1productiondata/last', getLastCNC1ProductionDataController);
app.get('/api/cnc1productiondata/today', getCurrentDayCNC1ProductionDataController);
app.get('/api/cnc1productiondata/letestRejectedCount', getLetestRejectedCountController);

//Breakdown Route for CNC1

// Start the server
app.listen(5001, () => {
    console.log("Server is running on Port 5001");
});

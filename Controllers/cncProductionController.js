const { getCNC1ProductionData, getLastCNC1ProductionData, getCurrentDayCNC1ProductionData, getLetestRejectedCount } = require("../Models/cncProductionModel");

const getCNC1ProductionDataController = async (req, res) => {
    try {
        const data = await getCNC1ProductionData();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data from CNC_1 PRODUCTION table' });
    }
};

const getLastCNC1ProductionDataController = async (req, res) => {
    try {
        const data = await getLastCNC1ProductionData();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch the latest record from CNC_1 PRODUCTION table' });
    }
};

const getCurrentDayCNC1ProductionDataController = async (req, res) => {
    try {
        const data = await getCurrentDayCNC1ProductionData();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch current day records from CNC_1 PRODUCTION table' });
    }
};

const getLetestRejectedCountController = async(req, res) => {
    try{
        const data = await getLetestRejectedCount();
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({err : "Failed to fetch last records from CNC_ Production table"})

    }
}

module.exports = {
    getCNC1ProductionDataController,
    getLastCNC1ProductionDataController,
    getCurrentDayCNC1ProductionDataController,
    getLetestRejectedCountController
};

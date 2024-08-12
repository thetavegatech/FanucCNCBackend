const { getCNC1Data, getLastCNC1Data } = require("../Models/CNC1Model");

const getCNC1DataController = async (req, res) => {
    try {
        const data = await getCNC1Data();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data from CNC_1 table' });
    }
};

const getLastCNC1DataController = async (req, res) => {
    try {
        const data = await getLastCNC1Data();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch the latest record from CNC_1 table' });
    }
};

module.exports = {
    getCNC1DataController,
    getLastCNC1DataController
};

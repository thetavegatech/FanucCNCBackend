const BreakdownSummary = require('../Models/breakdownModel');

exports.getAllBreakdowns = async (req, res) => {
    try {
        const breakdowns = await BreakdownSummary.getAll();
        res.status(200).json(breakdowns);
    } catch (err) {
        console.error('Error getting breakdowns:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getBreakdownById = async (req, res) => {
    try {
        const breakdown = await BreakdownSummary.getById(req.params.id);
        if (!breakdown) {
            return res.status(404).send('Breakdown not found');
        }
        res.status(200).json(breakdown);
    } catch (err) {
        console.error('Error getting breakdown by ID:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.createBreakdown = async (req, res) => {
    try {
        const data = req.body;
        // console.log('Received data:', data);  // Debugging line

        // Check if required fields are present
        if ( !data.MACHINE_NAME || !data.BREAKDOWN_TYPE || !data.BREAKDOWN_DETAILS) {
            return res.status(400).send('Bad Request: Missing required fields');
        }

        const newBreakdown = await BreakdownSummary.create(data);
        res.status(201).json(newBreakdown);
    } catch (err) {
        console.error('Error creating breakdown:', err);
        res.status(500).send('Internal Server Error');
    }
};


exports.updateBreakdown = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (!data || !data.MACHINE_NAME || !data.BREAKDOWN_TYPE || !data.BREAKDOWN_DETAILS) {
            return res.status(400).send('Bad Request: Missing required fields');
        }
        const result = await BreakdownSummary.update(id, data);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Breakdown not found');
        }
        res.status(200).send('Breakdown updated successfully');
    } catch (err) {
        console.error('Error updating breakdown:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteBreakdown = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await BreakdownSummary.delete(id);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Breakdown not found');
        }
        res.status(200).send('Breakdown deleted successfully');
    } catch (err) {
        console.error('Error deleting breakdown:', err);
        res.status(500).send('Internal Server Error');
    }
};

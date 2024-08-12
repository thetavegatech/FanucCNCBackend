const sql = require("mssql/msnodesqlv8");
const config = require("../config/dbConfig");

const getCNC1ProductionData = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT  [ID], [PART COUNT], [TOTAL PART COUNT], [DATE TIME], [MODEL NAME], [SHIFT]
            FROM [FanucMonitor].[dbo].[CNC_1 PRODUCTION]
        `);
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getLastCNC1ProductionData = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT TOP 1 [ID], [PART COUNT], [TOTAL PART COUNT], [DATE TIME], [MODEL NAME], [REJECTED COUNT], [SHIFT]
            FROM [FanucMonitor].[dbo].[CNC_1 PRODUCTION]
            ORDER BY [DATE TIME] DESC
        `);
        return result.recordset[0];
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};



const getCurrentDayCNC1ProductionData = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT [ID], [PART COUNT], [TOTAL PART COUNT], [DATE TIME], [MODEL NAME]
            FROM [FanucMonitor].[dbo].[CNC_1 PRODUCTION]
            WHERE CAST([DATE TIME] AS DATE) = CAST(GETDATE() AS DATE)
        `);
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getLetestRejectedCount = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT TOP 1 [REJECTED COUNT]
                FROM [CNC_1 PRODUCTION]
                    WHERE [REJECTED COUNT] > 0
                    ORDER BY ID DESC
        `);
        
        if (result.recordset.length > 0) {
            return result.recordset[0]; // Return the first element as an object
        } else {
            return null; // Handle the case where there are no results
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    getCNC1ProductionData,
    getLastCNC1ProductionData,
    getCurrentDayCNC1ProductionData,
    getLetestRejectedCount
};

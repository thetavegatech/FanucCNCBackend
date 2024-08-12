const sql = require("mssql/msnodesqlv8");
const config = require("../config/dbConfig");

const getCNC1Data = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT TOP 1000 [ID], [MACHINE_NO.], [SPINDEL-1 LOAD], [SERVO 1 LOAD], [SERVO 2 LOAD], 
            [SERVO 3 LOAD], [SERVO 4 LOAD], [SPINDEL-1 SPEED], [SERVO 1 TEMP], [SERVO 2 TEMP], 
            [SERVO 3 TEMP], [SERVO 4 TEMP], [ENCODER 1 TEMP.], [ENCODER 2 TEMP.], 
            [ENCODER 3 TEMP.], [ENCODER 4 TEMP.], [BATTERY 1 STATUS], [BATTERY 2 STATUS], 
            [BATTERY 3 STATUS], [BATTERY 4 STATUS], [DATE_TIME]
            FROM [FanucMonitor].[dbo].[CNC_1]
        `);
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getLastCNC1Data = async () => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT TOP 1 [ID], [MACHINE_NO.], [SPINDEL-1 LOAD], [SERVO 1 LOAD], [SERVO 2 LOAD], 
            [SERVO 3 LOAD], [SERVO 4 LOAD], [SPINDEL-1 SPEED], [SERVO 1 TEMP], [SERVO 2 TEMP], 
            [SERVO 3 TEMP], [SERVO 4 TEMP], [ENCODER 1 TEMP.], [ENCODER 2 TEMP.], 
            [ENCODER 3 TEMP.], [ENCODER 4 TEMP.], [BATTERY 1 STATUS], [BATTERY 2 STATUS], 
            [BATTERY 3 STATUS], [BATTERY 4 STATUS], [DATE_TIME]
            FROM [FanucMonitor].[dbo].[CNC_1]
            ORDER BY [DATE_TIME] DESC
        `);
        return result.recordset[0];
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

module.exports = {
    getCNC1Data,
    getLastCNC1Data
};

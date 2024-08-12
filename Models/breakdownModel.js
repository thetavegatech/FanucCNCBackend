const sql = require("mssql/msnodesqlv8");
const config = require("../config/dbConfig");

const BreakdownSummary = {

    getAll: async () => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request().query(`
                SELECT [ID], [MACHINE_NAME], [BREAKDOWN_TYPE], [BREAKDOWN_DETAILS], [START_TIME], [END_TIME], [STATUS]
                FROM [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY]
                ORDER BY [ID] DESC
            `);
    
            // Calculate the difference in minutes between START_TIME and END_TIME
            const breakdowns = result.recordset.map(record => {
                const startTime = new Date(record.START_TIME);
                const endTime = new Date(record.END_TIME);
                const differenceInMinutes = (endTime - startTime) / (1000 * 60); // difference in milliseconds converted to minutes
                
                return {
                    ...record,
                    DURATION_MINUTES: differenceInMinutes
                };
            });
    
            return breakdowns;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    },




    

    getById: async (id) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .query('SELECT * FROM [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY] WHERE [ID] = @ID');
            return result.recordset[0];
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    },

    

    create: async (data) => {
        if (!data) {
            throw new Error('No data provided');
        }
        console.log(data);
    
        const {
            MACHINE_NAME,
            BREAKDOWN_TYPE,
            BREAKDOWN_DETAILS,
            START_TIME,
            END_TIME,
            STATUS
        } = data;
    
        // Validate required fields
        if (!MACHINE_NAME || !BREAKDOWN_TYPE || !BREAKDOWN_DETAILS || !START_TIME || !END_TIME || !STATUS) {
            throw new Error('Missing required fields');
        }
    
        try {
            // Connect to the database
            const pool = await sql.connect(config);
    
            // Convert START_TIME and END_TIME to IST (assuming they are received in GMT)
            const startDate = new Date(START_TIME);
            const endDate = new Date(END_TIME);
    
            // Convert GMT to IST
            const istOffset = 5.5 * 60 * 60 * 1000; // IST is GMT+5:30
            const startDateIST = new Date(startDate.getTime() + istOffset);
            const endDateIST = new Date(endDate.getTime() + istOffset);
    
            console.log(startDateIST, endDateIST);
    
            // Execute the SQL query to insert the data
            const result = await pool.request()
                .input('MACHINE_NAME', sql.VarChar, MACHINE_NAME)
                .input('BREAKDOWN_TYPE', sql.VarChar, BREAKDOWN_TYPE)
                .input('BREAKDOWN_DETAILS', sql.VarChar, BREAKDOWN_DETAILS)
                .input('START_TIME', sql.DateTime, startDateIST)
                .input('END_TIME', sql.DateTime, endDateIST)
                .input('STATUS', sql.VarChar, STATUS)
                .query(`
                    INSERT INTO [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY] 
                    ([MACHINE_NAME], [BREAKDOWN_TYPE], [BREAKDOWN_DETAILS], [START_TIME], [END_TIME], [STATUS]) 
                    VALUES (@MACHINE_NAME, @BREAKDOWN_TYPE, @BREAKDOWN_DETAILS, @START_TIME, @END_TIME, @STATUS);
                    
                    -- Select the newly created record
                    SELECT * FROM [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY] 
                    WHERE [ID] = SCOPE_IDENTITY();
                `);
    
            // Return the newly created record
            return result.recordset[0];
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    },
    

    update: async (id, data) => {
        if (!data) throw new Error('No data provided');
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .input('MACHINE_NAME', sql.VarChar, data.MACHINE_NAME)
                .input('BREAKDOWN_TYPE', sql.VarChar, data.BREAKDOWN_TYPE)
                .input('BREAKDOWN_DETAILS', sql.VarChar, data.BREAKDOWN_DETAILS)
                .input('START_TIME', sql.DateTime, data.START_TIME)
                .input('END_TIME', sql.DateTime, data.END_TIME)
                .input('STATUS', sql.VarChar, data.STATUS)
                .query(`
                    UPDATE [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY] 
                    SET [MACHINE_NAME] = @MACHINE_NAME, [BREAKDOWN_TYPE] = @BREAKDOWN_TYPE, 
                        [BREAKDOWN_DETAILS] = @BREAKDOWN_DETAILS, [START_TIME] = @START_TIME, 
                        [END_TIME] = @END_TIME, [STATUS] = @STATUS 
                    WHERE [ID] = @ID
                `);
            return result;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .query('DELETE FROM [FanucMonitor].[dbo].[CNC_1_BREAKDOWN_SUMMARY] WHERE [ID] = @ID');
            return result;
        } catch (err) {
            console.error('SQL error', err);
            throw err;
        }
    }
};

module.exports = BreakdownSummary;

const config = {
    server: "192.168.1.7", // server address
    port: 1433, // SQL Server port
    database: "FanucMonitor",
    user: "sa", // your username
    password: "test1234", // your password
    options: {
        trustServerCertificate: true // for self-signed certificates
    }
};

module.exports = config;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI,
      {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
      }
    );

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error(
      "\n========== MONGODB CONNECTION ERROR =========="
    );

    console.error(
      "Message:",
      error.message
    );

    if (error.reason?.servers) {
      for (const [address, server] of error.reason.servers) {
        console.error("\nSERVER:", address);

        if (server.error) {
          console.error(
            "ERROR NAME:",
            server.error.name
          );

          console.error(
            "ERROR MESSAGE:",
            server.error.message
          );

          console.error(
            "ERROR CODE:",
            server.error.code
          );

          console.error(
            "ERROR STACK:",
            server.error.stack
          );
        }
      }
    }

    console.error(
      "\n==============================================\n"
    );

    throw error;
  }
};

module.exports = connectDB;
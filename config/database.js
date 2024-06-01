import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const cnx = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected: ${cnx.connection.host}`);
  } catch (err) {
    console.error(`Database Error: ${err}`);
    process.exit(1);
  }
};

export default dbConnection;

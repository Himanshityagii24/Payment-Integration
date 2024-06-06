import { connect } from 'mongoose';

const connectToMongo = async () => {
  try {
    await connect('mongodb://localhost:27017', {
      dbName: "PaymentIntegration"  // Ensure the database name does not contain spaces
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectToMongo;

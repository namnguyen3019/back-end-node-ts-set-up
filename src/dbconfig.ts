const { MongoClient } = require("mongodb");

async function connectDB() {
  const uri =
    "mongodb+srv://username:password123456@cluster0.ycsni.mongodb.net/my-blog?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("connect successfully");
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

export default connectDB;

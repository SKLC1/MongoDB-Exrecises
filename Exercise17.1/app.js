// or as an es module:
import { MongoClient, ObjectId } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'products';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('products');

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
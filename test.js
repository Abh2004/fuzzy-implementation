const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://arjunmaurya1920:r6NyD7m0003S1Sgx@moviedb.splmmag.mongodb.net/?retryWrites=true&w=majority&appName=moviedb';

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('sample_mflix');
        const collection = database.collection('movies');

        const documents = await collection.find({}).toArray(); // Fetch all documents

        if (documents.length > 1000) {
            const excessMovies = documents.slice(1000);
            console.log('Excess movies:', excessMovies);

            for (const movie of excessMovies) {
                await collection.deleteOne({ _id: movie._id });
                console.log(`Deleted movie with ID ${movie._id}`);
            }

            console.log('Excess movies deleted.');
        } else {
            console.log('No excess movies found.');
        }
    } catch (e) {
        console.error(`Error connecting to MongoDB Atlas: ${e}`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

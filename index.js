const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb+srv://arjunmaurya1920:r6NyD7m0003S1Sgx@moviedb.splmmag.mongodb.net/?retryWrites=true&w=majority&appName=moviedb';
app.use(express.static('public'));

app.get('/movies', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const collection = database.collection('movies');
        const movies = await collection.find({}).toArray();
        res.json(movies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

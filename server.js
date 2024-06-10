const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const futebolRouter = require('./API');



require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/futebol', futebolRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("MongoDB Atlas Conectado"))
.catch((error) => console.log(error));

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});


const Item = mongoose.model('Item', itemSchema);
app.post('/items', async (req, res) => {
    try {
        const existingItem = await Item.findOneAndUpdate(
            { name: req.body.name, description: req.body.description },
            { name: req.body.name, description: req.body.description },
            { upsert: true, new: true }
        );

        console.log('Novo item cadastrado:', existingItem);
        res.status(201).json(existingItem);
    } catch (error) {
        console.error('Erro ao cadastrar novo item:', error);
        res.status(500).json({ message: 'Erro ao cadastrar novo item' });
    }
});


app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.put('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

app.listen(port, () => {
  console.log(`servidor esta escutando no http://localhost:${port}`);
});

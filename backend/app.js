import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import { MongoClient } from 'mongodb';

let meals = [];

MongoClient.connect('mongodb+srv://nhnkg123:03110712@cluster0.obhtxgf.mongodb.net/meals?retryWrites=true&w=majority')
  .then(client => {
    console.log('connected!');

    const db = client.db();

    const mealsCollection = db.collection('meals')

    return mealsCollection.find().toArray();
  })
  .then(mealsData => {
    meals = mealsData;
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  res.json(meals);
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items === []) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  MongoClient.connect('mongodb+srv://nhnkg123:03110712@cluster0.obhtxgf.mongodb.net/orders?retryWrites=true&w=majority')
  .then(client => {
    console.log('connected!');

    const db = client.db();

    const mealsCollection = db.collection('orders')

    mealsCollection.insertOne(orderData);
  })
  .catch(err => {
    console.log(err);
  });

  // const newOrder = {
  //   ...orderData,
  //   id: (Math.random() * 1000).toString(),
  // };
  // const orders = await fs.readFile('./data/orders.json', 'utf8');
  // const allOrders = JSON.parse(orders);
  // allOrders.push(newOrder);
  // await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);




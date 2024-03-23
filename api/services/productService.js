const fs = require('fs').promises;
const Product = require('../models/product'); // Import your Mongoose model here

exports.setInitialProductListService = async () => {

  try {
    const jsonData = await fs.readFile('fakeData.json', 'utf8');
    const data = JSON.parse(jsonData);

    await Product.create(data);
  } catch (err) {
    console.error('Error storing initial data:', err);
  }
}

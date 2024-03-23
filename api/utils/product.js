const fs = require('fs').promises;

exports.getInitialData = async () => {

  try {
    const jsonData = await fs.readFile('fakeData.json', 'utf8');
    const data = JSON.parse(jsonData);

    return data;
  } catch (err) {
    console.error('Error storing initial data:', err);
    return [];
  }
}


exports.createFakeData = () => {
  const fs = require('fs');

// Function to generate a random number between min and max (inclusive)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create an array to hold the products
const products = [];

// Generate 30 products
for (let i = 1; i <= 30; i++) {
  const product = {
    title: `Test Product ${i}`,
    price: getRandom(50, 100),
    image: `https://picsum.photos/id/${getRandom(50, 100)}/300/300`,
    qty: 1,
  };
  products.push(product);
}

// Write the products array to a JSON file
fs.writeFile('fakeData.json', JSON.stringify(products, null, 2), err => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('Products file created successfully');
  }
});

};
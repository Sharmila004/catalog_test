const fs = require('fs');

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('test_case2.json', 'utf8'));

// Extract n and k
const n = data.keys.n;
const k = data.keys.k;

// Decode y values from different bases
let points = [];
for (let i = 1; i <= n; i++) {
  let key = i.toString(); // Convert the number to a string to access the JSON keys

  if (data.hasOwnProperty(key)) {  // Check if the key exists
    let x = i; // x is the key (1, 2, 3,...)
    let base = parseInt(data[key].base); // Access base and value using string keys
    let y = parseInt(data[key].value, base); // Decode y based on the base
    points.push({ x, y });
  } else {
    console.log(`Key ${key} is missing in the JSON file`);
  }
}

// Function to calculate the Lagrange interpolation polynomial
function lagrangeInterpolation(points, x) {
  let total = 0;

  for (let i = 0; i < points.length; i++) {
    let xi = points[i].x;
    let yi = points[i].y;

    let term = yi;
    for (let j = 0; j < points.length; j++) {
      if (j !== i) {
        term *= (x - points[j].x) / (xi - points[j].x);
      }
    }
    total += term;
  }

  return total;
}

// Calculate the constant term c (f(0))
const c = lagrangeInterpolation(points, 0);
console.log("The constant term c is:", c);

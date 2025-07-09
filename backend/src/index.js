import express from 'express'
import morgan from 'morgan'

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import connectDB from './db/connect.js';
import authRouter from 'authRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Authenticate User

// Middleware and Routes


app.use(express.json()) // Κάνει διαθέσιμα τα στοιχεία JSON στις διαδρομές μας παρακάτω (λόγω POST request)

app.get('/', (req, res) => {
  res.send('Ούλε τε και μάλα χαίρε!');
});

app.use('/api/vi/auth', authRouter) 

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async (url) => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Εν λειτουργία διακομιστής στην πύλη ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

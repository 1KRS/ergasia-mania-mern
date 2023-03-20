import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import connectDB from './db/connect.js';
import 'express-async-errors'; // Πρέπει να μπαίνει πριν τους δρομολογητές (Routers)
import jobsRouter from './routes/jobsRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Authentication | Αυθεντικοποίηση Χρήστη


// Middleware and Routes | Ενδιάμεσο λογισμικό και διαδρομές

app.use(express.json()); // Κάνει διαθέσιμα τα στοιχεία JSON στις διαδρομές μας παρακάτω (λόγω POST request)

app.get('/api/v1', (req, res) => {
  res.send('Ούλε τε και μάλα χαίρε!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server | Εκκίνηση διακομιστή εφόσον έχουμε συνδεθεί επιτυχώς στην βάση δεδομένων μας
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

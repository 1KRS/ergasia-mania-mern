import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import connectDB from './db/connect.js';
import 'express-async-errors'; // Πρέπει να μπαίνει πριν τους δρομολογητές (Routers)
import jobsRouter from './routes/jobsRoutes.js';
import authRouter from './routes/authRoutes.js';
import morgan from 'morgan';
import authenticateUser from './middleware/auth.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Authentication | Αυθεντικοποίηση Χρήστη


// Middleware and Routes | Ενδιάμεσο λογισμικό και διαδρομές

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json()); // Κάνει διαθέσιμα τα στοιχεία JSON στις διαδρομές μας παρακάτω (λόγω POST request)

app.get('/api/v1', (req, res) => {
  res.send('Ούλε τε και μάλα χαίρε!');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// Only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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

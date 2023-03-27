import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Παρακαλώ, γράψε το όνομα της εταιρείας.'],
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Παρακαλώ, γράψε τη θέση εργασίας.'],
      minLength: 10,
      maxLength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Συνέντευξη', 'Εκκρεμεί', 'Απορρίφθηκε'],
      default: 'Εκκρεμεί',
    },
    jobType: {
      type: String,
      enum: [
        'Πλήρης Απασχόληση',
        'Ημιαπασχόληση',
        'Απομακρυσμένη',
        'Πρακτική',
        'Υβριδική',
      ],
      default: 'Πλήρης Απασχόληση',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Παρακαλώ δηλώστε χρήστη'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);

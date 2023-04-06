import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


const links = [
  {
    id: 1,
    textGr: 'στατιστικά',
    textUk: 'statistics',
    textSe: 'statistik',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    textGr: 'εργασίες',
    textUk: 'jobs',
    textSe: 'jobb',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    textGr: 'προσθήκη',
    textUk: 'add job',
    textSe: 'lägga till',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    textGr: 'σελίδα χρήστη',
    textUk: 'profile',
    textSe: 'profil',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default links;

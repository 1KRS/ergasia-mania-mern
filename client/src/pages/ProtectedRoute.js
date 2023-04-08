import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
  const { language, user, userLoading } = useAppContext();
  if (userLoading) return <Loading />;
  if (!user) {
    return language === 'english' ? (
      <Navigate to="/landingUk" />
    ) : language === 'swedish' ? (
      <Navigate to="/landingSe" />
    ) : (
      <Navigate to="/landingEl" />
    );
  }
  return children;
};

export default ProtectedRoute;

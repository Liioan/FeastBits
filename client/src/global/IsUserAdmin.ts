import { useAuth } from '../context/AuthContext';

const checkForAdmin = () => {
  const context = useAuth();
  if (!context) return null;
  const { user } = context;

  let isUserAdmin = false;
  if (user && user.is_admin) {
    isUserAdmin = true;
  }
  return isUserAdmin;
};

export default checkForAdmin;

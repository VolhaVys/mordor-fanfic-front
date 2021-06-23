import { useSelector } from 'react-redux';
import { getUserData } from './redux/selectors/selector';

const AuthManager = () => {
  const user = useSelector(getUserData);

  const getUser = () => user;

  return {
    getUser,
  };
};

export default AuthManager;

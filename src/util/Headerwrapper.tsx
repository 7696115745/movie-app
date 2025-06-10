import { useLocation } from 'react-router-dom';
import Header from '../component/Header';

export default function HeaderWrapper() {
  const location = useLocation();
  const hideHeaderOn = ['/login', '/signup'];

  const shouldShow = !hideHeaderOn.includes(location.pathname);

  return shouldShow ? <Header /> : null;
}

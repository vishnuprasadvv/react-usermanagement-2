import{ Navigate , Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateAdminRoute = () => {
    const {adminInfo} = useSelector((state) => state.auth)
  return adminInfo ? <Outlet /> : <Navigate to= '/admin/login' replace />
}

export default PrivateAdminRoute
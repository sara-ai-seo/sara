import { useSelector } from 'react-redux'
import { RootState } from '../store'

const CheckUser = () => {
  const user = useSelector((state: RootState) => state.user.user.account_type)
  return user
}

export default CheckUser
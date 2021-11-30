import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/features/user-api-slice'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}

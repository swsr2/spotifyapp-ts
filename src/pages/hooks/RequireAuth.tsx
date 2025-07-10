import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'

type AuthStatus = 'ok' | 'redirect' | 'unauthorized'

const useRequireAuth = (): AuthStatus => {
  const [status, setStatus] = useState<AuthStatus>('ok')
  const navigate = useNavigate()
  const location = useLocation()
  const hasRedirected = useRef(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (!token && !hasRedirected.current) {
      hasRedirected.current = true

      // 1. 저장된 토큰 제거
      localStorage.removeItem('access_token')

      // 2. 경고 메시지
      alert('잘못된 접근입니다. 로그인 후 다시 이용해주세요.')

      // 3. 로그인 페이지 이동
      navigate('/', { replace: true })

      // 4. 상태 설정
      setStatus('unauthorized')

      // 5. URL 깔끔하게
      window.history.replaceState({}, document.title, '/')
    }
  }, [navigate, location])

  return status
}

export default useRequireAuth

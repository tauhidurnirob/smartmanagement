import { useEffect, useState, useCallback } from 'react'

const useClientSize = (ref: any) => {
  const [size, setSize] = useState({
    width: ref.current?.clientWidth,
    height: ref.current?.clientHeight,
  })

  const getClientSize = useCallback(() => {
    setSize({
      width: ref.current?.clientWidth,
      height: ref.current?.clientHeight,
    })
  }, [ref])

  useEffect(() => {
    window.addEventListener('resize', getClientSize)
    getClientSize()
    return () => {
      window.removeEventListener('resize', getClientSize)
    }
  }, [getClientSize])
  return size
}

export default useClientSize

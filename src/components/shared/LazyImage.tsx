import React, { useEffect, useRef, useState } from 'react'

interface IProps {
  id: string
  src: string
}

const LazyImage = (props: IProps) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLImageElement | null>(null)

  let callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setInView(true)
      }
    });
  }

  useEffect(() => {
    let observer = new IntersectionObserver(callback)
    if (ref?.current) {
      observer.observe(ref?.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return inView ? (
    <img {...props} />
  )
    : (
      <img {...props} ref={ref} />
    )
}

export default LazyImage

import { useEffect, useRef, useState } from 'react'

import styles from './Loading.module.css'

const Loading = () => {
  const num = useRef<null | HTMLDivElement>(null)
  const numVal = Number(num.current?.getAttribute('data-value'))
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter !== numVal) {
        setCounter(counter + 1)
      }
    }, 80)

    if (counter === 100) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [counter, numVal])

  return (
    <div className={styles.progressBar}>
      <span className={styles.number} data-value="100">
        {counter}%
      </span>
      <svg height="150" width="150" className={styles.circle}>
        <circle
          cx="75"
          cy="75"
          r="65"
          stroke="#698ad6"
          strokeWidth="20"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default Loading

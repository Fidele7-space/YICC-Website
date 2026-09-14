import React, { useState } from 'react'

export default function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0)
  return (
    <button id="counter" type="button" onClick={() => setCount(c => c + 1)}>
      count is {count}
    </button>
  )
}

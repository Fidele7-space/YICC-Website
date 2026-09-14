import React, { useEffect, useRef } from 'react'

type Props = {
  html: string
  containerId?: string
}

export default function PageLoader({ html, containerId }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    // ensure container has the requested id so page scripts can scope queries
    if (containerId) ref.current.id = containerId

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    // Inject only the body contents
    ref.current.innerHTML = doc.body.innerHTML

    // Dispatch an event so the parent page component can wire up interactivity
    window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { containerId } }))

    return () => {
      // clean up inserted HTML on unmount
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [html, containerId])

  return <div ref={ref} />
}

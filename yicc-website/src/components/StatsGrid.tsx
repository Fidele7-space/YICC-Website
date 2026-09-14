import React, { useEffect, useRef } from 'react'

type Stat = { label: string; value: number | string }

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('h3[data-target]') || []
    const DURATION = 2000

    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0', 10) || 0
      let start: number | null = null
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / DURATION, 1)
        const value = Math.floor(progress * target)
        el.innerText = `${value}+`
        if (progress < 1) requestAnimationFrame(step)
        else el.innerText = `${target}+`
      }
      requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          elements.forEach(el => animate(el as HTMLElement))
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center bg-white/5 p-4 rounded">
          <img src="/assets/yicc-logo.png" alt="" className="w-10 h-10 mb-2" />
          <h3 data-target={typeof s.value === 'number' ? String(s.value) : undefined} className="text-2xl font-bold">
            {typeof s.value === 'number' ? `${s.value}+` : s.value}
          </h3>
          <span className="text-sm text-gray-500">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

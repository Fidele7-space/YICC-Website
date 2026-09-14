import React from 'react'

export default function ProgramCard({ img, title, subtitle, children }: { img: string; title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <article className="bg-white/5 p-4 rounded shadow-sm flex flex-col items-start gap-3">
      <img src={img} alt="" className="w-12 h-12 object-contain" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>
      <a className="mt-auto text-sm text-green-600" href="#">{'Learn More →'}</a>
    </article>
  )
}

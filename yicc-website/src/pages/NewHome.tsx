import React, { useEffect } from 'react'
import PageLoader from '../components/PageLoader'
import newhomeHtml from "../Files' Folders/html files/newhome.html?raw"
import "../Files' Folders/CSS Files/newhome.css"

export default function NewHome() {
  useEffect(() => {
    function onLoaded(e: any) {
      const containerId = e?.detail?.containerId || ''
      const root = containerId ? document.getElementById(containerId) : document
      if (!root) return

      // Topbar hide on scroll
      let lastScrollY = window.scrollY
      const topbar = root.querySelector('.topbar') as HTMLElement | null
      if (topbar) {
        const onScroll = () => {
          const currentScrollY = window.scrollY
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            topbar.classList.add('topbar--hidden')
          } else {
            topbar.classList.remove('topbar--hidden')
          }
          lastScrollY = currentScrollY
        }
        window.addEventListener('scroll', onScroll)

        // cleanup
        ;(onLoaded as any)._cleanup = () => window.removeEventListener('scroll', onScroll)
      }

      // Counters animation
      const elementsContainer = root.querySelector('.elements')
      const counters = elementsContainer ? elementsContainer.querySelectorAll('.Elements-content h1') : []
      const DURATION = 3000

      const animateCounters = () => {
        ;(Array.from(counters) as HTMLElement[]).forEach(counter => {
          const target = parseInt(counter.innerText.replace('+', ''), 10) || 0
          let start: number | null = null
          const update = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / DURATION, 1)
            const value = Math.floor(progress * target)
            counter.innerText = value + '+'
            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              counter.innerText = target + '+'
            }
          }
          requestAnimationFrame(update)
        })
      }

      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            animateCounters()
            observer.disconnect()
          }
        },
        { threshold: 0.4 }
      )

      if (elementsContainer) observer.observe(elementsContainer)

      // Contact form handling (basic validation + fetch)
      const form = root.querySelector('#contactForm') as HTMLFormElement | null
      if (form) {
        const submitHandler = async (ev: Event) => {
          ev.preventDefault()
          try {
            const usernameEl = form.querySelector('#username') as HTMLInputElement | null
            const emailEl = form.querySelector('#email') as HTMLInputElement | null
            const messageEl = form.querySelector('#message') as HTMLTextAreaElement | null
            const username = usernameEl?.value.trim() || ''
            const email = emailEl?.value.trim() || ''
            const message = messageEl?.value.trim() || ''

            if (username.length < 6) throw new Error('Full name must be at least 6 characters')
            if (!email.includes('@')) throw new Error('Your email should contain @ symbol')
            if (message.length < 10) throw new Error('The message should be at least 10 characters')

            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, email, message }),
            })
            if (!response.ok) throw new Error('Something went wrong. Please try again later.')
            form.reset()
          } catch (err: any) {
            alert(err.message || 'Form error')
          }
        }
        form.addEventListener('submit', submitHandler)
        ;(onLoaded as any)._cleanupForm = () => form.removeEventListener('submit', submitHandler)
      }
    }

    window.addEventListener('pageContentLoaded', onLoaded)
    // also try to run if content already present
    window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { containerId: 'newhome-root' } }))

    return () => {
      window.removeEventListener('pageContentLoaded', onLoaded)
      // attempt to call any cleanup attached
      if ((onLoaded as any)._cleanup) (onLoaded as any)._cleanup()
      if ((onLoaded as any)._cleanupForm) (onLoaded as any)._cleanupForm()
    }
  }, [])

  return <PageLoader html={newhomeHtml} containerId="newhome-root" />
}

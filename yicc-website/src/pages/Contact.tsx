import React from 'react'
import PageLoader from '../components/PageLoader'
import contactHtml from "../Files' Folders/html files/contact.html?raw"
import "../Files' Folders/CSS Files/contacts.css"

export default function Contact() {
  return <PageLoader html={contactHtml} containerId="contact-root" />
}

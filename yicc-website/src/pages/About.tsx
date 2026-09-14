import React from 'react'
import PageLoader from '../components/PageLoader'
import aboutHtml from "../Files' Folders/html files/about.html?raw"
import "../Files' Folders/CSS Files/about.css"

export default function About() {
  return <PageLoader html={aboutHtml} containerId="about-root" />
}

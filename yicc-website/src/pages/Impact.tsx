import React from 'react'
import PageLoader from '../components/PageLoader'
import impactHtml from "../Files' Folders/html files/impact.html?raw"
import "../Files' Folders/CSS Files/impact.css"

export default function Impact() {
  return <PageLoader html={impactHtml} containerId="impact-root" />
}

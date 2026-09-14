import React from 'react'
import PageLoader from '../components/PageLoader'
import programsHtml from "../Files' Folders/html files/Programs.html?raw"
import "../Files' Folders/CSS Files/newhome.css"

export default function Programs() {
  return <PageLoader html={programsHtml} containerId="programs-root" />
}

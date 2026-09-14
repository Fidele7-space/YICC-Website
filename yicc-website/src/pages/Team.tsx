import React from 'react'
import PageLoader from '../components/PageLoader'
import teamHtml from "../Files' Folders/html files/team.html?raw"
import "../Files' Folders/CSS Files/team.css"

export default function Team() {
  return <PageLoader html={teamHtml} containerId="team-root" />
}

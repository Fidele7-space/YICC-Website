import React from 'react'
import PageLoader from '../components/PageLoader'
import treeHtml from "../Files' Folders/html files/treeplanting.html?raw"
import "../Files' Folders/CSS Files/treeplanting.css"

export default function Treeplanting() {
  return <PageLoader html={treeHtml} containerId="tree-root" />
}

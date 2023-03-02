import React from 'react'
import { useParams } from 'react-router-dom'

const SelfDetail = () => {
  const { tool } = useParams()

  return <div>{tool}</div>
}

export default SelfDetail

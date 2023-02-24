import React from 'react'

const BasicList = ({ title, subtitle, position }) => {
  return <div>{position}. {title} by {subtitle}</div>
}

export default BasicList

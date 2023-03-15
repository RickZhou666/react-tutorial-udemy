import React from 'react'

const MyParagraph = (props) => {
  console.log('5th MyParagraph RUNNING')
  return <p>{props.children}</p>
}

export default MyParagraph

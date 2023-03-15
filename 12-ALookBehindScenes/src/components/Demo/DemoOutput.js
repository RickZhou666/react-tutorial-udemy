import React from 'react'
import MyParagraph from './MyParagraph'

const DemoOutput = (props) => {
  console.log('3rd DemoOutput RUNNING')
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>
}

// export default React.memo(DemoOutput)
export default React.memo(DemoOutput)

// props.show === props.previous.show

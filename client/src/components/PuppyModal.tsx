import React from 'react'

interface IPuppyModal {
    children: React.ReactNode;
}

const PuppyModal = ({children}: IPuppyModal) => {

  return (
    <div>{children}</div>
  )
}

export default PuppyModal
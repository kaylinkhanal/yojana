import React from 'react'

const page = ({params}) => {
  return (
    <div>
      My Post: {params.slug}
    </div>
  )
}

export default page
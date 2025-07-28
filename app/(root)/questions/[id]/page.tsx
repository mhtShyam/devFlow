import { RouteParams } from '@/types/global'
import React from 'react'

const QuestionDetails = ({params}:RouteParams) => {
    const {id} = params;
  return (
    <div>
      This is the Question Details page. :{id}
    </div>
  )
}

export default QuestionDetails

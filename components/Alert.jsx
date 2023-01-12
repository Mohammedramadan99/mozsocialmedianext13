import React, { useEffect, useState } from 'react'

export default function Alert({ type, content })
{

  return (
    <div className={type === 'error' ? `alert__err` : type === 'success' && `alert__success`} >
      {content}
    </div>
  )
}

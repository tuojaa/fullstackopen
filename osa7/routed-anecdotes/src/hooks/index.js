import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }

  return {
    attrs: {
      type,
      value,
      onChange,    
    },
    reset
  }
}
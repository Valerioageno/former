import type { InputEffect, Result } from './types'
import { InputHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<InputEffect, InputProps>((props, ref): JSX.Element => {
  // Boolean with radio an checkbox
  const [state, setState] = useState<string | boolean>('')

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result {
        return { name: props?.name || 'former-input', value: state }
      },
    }),
    [props.name, state],
  )

  return (
    <input
      name="former-input"
      {...props}
      value={state as string}
      onChange={(e): void => {
        props.onChange?.(e)
        setState(e.target.value)
      }}
    />
  )
})

Input.displayName = 'FormerInput'
export default Input

import React, { PropsWithChildren } from 'react'
import { ButtonProps } from './types'

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ variant, children, ...rest }) => (
  <button {...rest}>{children}</button>
)

export default Button

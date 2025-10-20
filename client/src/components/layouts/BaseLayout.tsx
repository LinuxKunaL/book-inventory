import clsx from 'clsx'
import React from 'react'

type Props = {
children?: React.ReactNode
className?: string
}

function BaseLayout({children,className}: Props) {
  return (
    <div className={clsx("dark:bg-gray-900 w-full",className)}>{children}</div>
  )
}

export default BaseLayout
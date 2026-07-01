import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WorkSpaceHeader = () => {
  return (
    <div className="flex w-full items-center justify-between p-4 text-base">
      {/* Logo */}
      <Image src="/logo.png" alt="Logo" width={50} height={50} />

        {/* menu */}
        <ul className="flex gap-5 text-xl">
            <li className="hover:text-purple-500 cursor-pointer">Workspace</li>
            <li className="hover:text-purple-500 cursor-pointer">Pricing</li>
            <li className="hover:text-purple-500 cursor-pointer">Support</li>
        </ul>

        <UserButton />
    </div>
  )
}

export default WorkSpaceHeader

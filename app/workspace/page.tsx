import React from 'react'
import WorkSpaceBody from './_components/WorkSpaceBody'

const WorkSpacePage = () => {
  return (
    <main className="flex-1 p-lg gap-gutter grid grid-cols-12 overflow-hidden h-[calc(100vh-64px)] w-full">
      <WorkSpaceBody />
    </main>
  )
}

export default WorkSpacePage

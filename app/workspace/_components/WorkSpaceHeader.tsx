import { UserButton } from '@clerk/nextjs'
import React from 'react'

const WorkSpaceHeader = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-xl border-b border-outline-variant/12 shadow-none flex justify-between items-center px-lg h-16 shrink-0 z-40">
      <div className="flex items-center gap-md flex-1">
        <div className="relative w-96 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-fixed transition-colors text-[20px]">search</span>
          <input className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full py-1.5 pl-10 pr-4 text-on-surface focus:outline-none focus-within:ring-1 focus-within:ring-primary-fixed focus:border-primary-fixed transition-all font-code-sm text-[13px] placeholder:text-on-surface-variant/50" placeholder="Search logs, queries..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-sm">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/30 transition-all active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/30 transition-all active:scale-95">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        <div className="h-6 w-px bg-outline-variant/30 mx-xs"></div>
        <div className="ml-xs">
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default WorkSpaceHeader

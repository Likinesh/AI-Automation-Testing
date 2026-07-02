import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const EmptyFolder = () => {
  return (
    <div className="flex flex-col items-center mt-10 justify-center gap-4">
        <Image src="/file.png" alt="Empty Folder" width={70} height={70} />
        <h2 className="font-bold text-2xl mt-5 mb-4"> No Repository Added</h2>
        <p className="text-center mx-10 text-gray-400">
          Connect your GitHub account to add a repository. To generate and run test cases.
        </p>
        <Button className="mt-5">
            <Link className="h-4 w-4 mr-2" /> Connect Repo
        </Button>
    </div>
  )
}

export default EmptyFolder

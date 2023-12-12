import React from 'react'

import { ShieldIcon, UnderReviewIcon } from '../icons'
import { UnverifiedIcon } from '../icons/symbols/UnverifiedIcon'

export interface ProjectCellProps {
  project: {
    name: string
    slug: string
    isVerified?: boolean
    isUpcoming?: boolean
    isArchived?: boolean
    showProjectUnderReview?: boolean
    warning?: string
  }
}

export function ProjectCell({ project }: ProjectCellProps) {
  return (
    <div>
      <span className="text-base font-bold group-hover:underline md:text-lg">
        {project.name}
      </span>
      {project.isVerified === false && (
        <span className="pl-1.5">
          <span
            className="Tooltip inline-block"
            title="This project contains unverified contracts."
          >
            <UnverifiedIcon className="relative top-px h-4 w-4 fill-red-300" />
          </span>
        </span>
      )}
      {project.showProjectUnderReview && (
        <span className="pl-1.5">
          <span
            className="Tooltip inline-block"
            title="This project is under review."
          >
            <UnderReviewIcon className="relative top-px h-4 w-4" />
          </span>
        </span>
      )}
      {project.warning && (
        <span className="pl-1.5">
          <span className="Tooltip inline-block" title={project.warning}>
            <ShieldIcon className="relative top-px h-4 fill-yellow-700 dark:fill-yellow-300" />
          </span>
        </span>
      )}
    </div>
  )
}

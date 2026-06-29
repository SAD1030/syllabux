function InstructorModuleList({ courseTitle, modules }) {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order)

  return (
    <div className="glass-panel rounded-lg p-5">
      <p className="mb-4 font-label-sm uppercase text-on-surface-variant">
        {courseTitle} — modules in sequence
      </p>

      <div className="flex flex-col gap-2">
        {sortedModules.map((module) => (
          <div
            key={module.id}
            className="flex items-center gap-3 rounded-md bg-surface px-4 py-3"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-high font-label-sm text-on-surface-variant">
              {module.order}
            </span>
            <span className="font-body-md text-on-background">{module.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InstructorModuleList

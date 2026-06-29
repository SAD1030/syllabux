function InstructorCourseCard({ course, onViewModules }) {
  return (
    <article className="glass-panel group flex h-full flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={course.imageUrl}
          alt=""
        />
        <span className="absolute left-3 top-3 rounded-full bg-earth-tan px-3 py-1 font-label-sm text-label-sm text-on-tertiary-fixed-variant">
          {course.statusLabel}
        </span>
      </div>

      <h4 className="mb-1 font-headline-md text-body-lg text-primary">
        {course.title}
      </h4>
      <p className="mb-4 font-label-md text-label-md text-on-surface-variant">
        {course.studentsLabel}
      </p>

      <div className="mt-auto">
        <div className="mb-2 flex items-end justify-between">
          <span className="font-label-sm text-label-sm text-secondary">
            {course.progressLabel}
          </span>
          <span className="font-label-sm text-label-sm text-primary">
            {course.progressPercent}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-tertiary-fixed">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${course.progressPercent}%` }}
          />
        </div>

        <div className="mt-6 flex gap-2">
          <button
            className={`flex-1 rounded-lg py-3 font-label-md text-label-md transition-colors ${
              course.action.variant === 'primary'
                ? 'bg-primary text-white hover:bg-primary-container'
                : 'border border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            type="button"
          >
            {course.action.label}
          </button>
          <button
            className="flex items-center gap-1 rounded-lg border border-outline-variant px-4 py-3 font-label-md text-label-md text-on-background hover:bg-surface-container"
            onClick={() => onViewModules(course)}
            type="button"
          >
            modules
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default InstructorCourseCard

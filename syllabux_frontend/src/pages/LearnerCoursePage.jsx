import { useParams, useNavigate } from 'react-router-dom'
import { getLearnerDashboardData } from '../data/learnerDashboard'
import { useAuth } from '../auth/authContext'

function ProgressRing({ percent }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width="72" height="72" className="shrink-0 -rotate-90">
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-surface-container-high"
      />
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-primary transition-all duration-500"
      />
      <text
        x="36"
        y="36"
        textAnchor="middle"
        dominantBaseline="middle"
        className="rotate-90 fill-primary font-label-sm text-[11px] font-semibold"
        transform="rotate(90, 36, 36)"
      >
        {percent}%
      </text>
    </svg>
  )
}

function ModuleRow({ module, isCompleted }) {
  return (
    <div className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-label-sm ${
          isCompleted
            ? 'bg-primary text-on-primary'
            : 'bg-surface-container-high text-on-surface-variant'
        }`}
      >
        {isCompleted ? (
          <span className="material-symbols-outlined text-[14px]">check</span>
        ) : (
          module.order
        )}
      </span>

      <span className="flex-1 font-body-md lowercase text-on-background">
        {module.title}
      </span>

      {isCompleted && (
        <span className="font-label-sm lowercase text-secondary">done</span>
      )}
    </div>
  )
}

function LearnerCoursePage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const data = getLearnerDashboardData()
  const course = data.courses.find((c) => String(c.id) === courseId)

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-panel rounded-3xl px-8 py-14 text-center">
          <h2 className="mb-2 font-headline-md text-headline-md lowercase text-primary">
            course not found
          </h2>
          <p className="mb-6 font-body-md lowercase text-on-surface-variant">
            this course doesn't exist or you may not be enrolled.
          </p>
          <button
            className="rounded-full bg-primary px-8 py-3 font-label-md lowercase text-on-primary"
            onClick={() => navigate('/learn/dashboard')}
            type="button"
          >
            back to dashboard
          </button>
        </div>
      </div>
    )
  }

  // Modules sorted by order — sequencing is a hard requirement (TSK-10/11).
  // completedModules count determines which rows are marked done.
  const sortedModules = [...(course.modules ?? [])].sort(
    (a, b) => a.order - b.order,
  )
  const completedCount = course.completedModules ?? 0
  const progressPercent =
    sortedModules.length > 0
      ? Math.round((completedCount / sortedModules.length) * 100)
      : course.progressPercent ?? 0

  const isCompleted = progressPercent === 100

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_50%,#f9f9f8_0%,#ece0dc_100%)] font-body-md text-on-surface lg:ml-24">
      <div className="mx-auto max-w-2xl px-margin-mobile py-14 md:px-margin-tablet lg:px-margin-desktop">

        {/* back link */}
        <button
          className="mb-8 flex items-center gap-1 font-label-sm lowercase text-secondary"
          onClick={() => navigate('/learn/dashboard')}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          back to your courses
        </button>

        {/* course hero */}
        <div className="glass-panel-elevated mb-8 rounded-3xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <span
                className={`mb-3 inline-block rounded-full px-4 py-1 font-label-sm lowercase ${
                  course.badge?.tone === 'primary'
                    ? 'bg-primary text-on-primary'
                    : course.badge?.tone === 'sky'
                      ? 'bg-sky-blue text-on-secondary-container'
                      : 'bg-earth-tan text-white'
                }`}
              >
                {course.badge?.label ?? 'enrolled'}
              </span>
              <h1 className="mb-2 font-headline-md text-headline-md lowercase text-primary">
                {course.title}
              </h1>
              <p className="font-body-md lowercase text-on-surface-variant">
                {course.description}
              </p>
            </div>

            <ProgressRing percent={progressPercent} />
          </div>

          {/* metadata row */}
          {course.metadata?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-6 text-on-surface-variant">
              {course.metadata.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                  <span className="font-label-sm">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* completion banner */}
          {isCompleted && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary/10 px-5 py-4">
              <span className="material-symbols-outlined text-primary">
                workspace_premium
              </span>
              <div>
                <p className="font-label-md lowercase text-primary">
                  course completed
                </p>
                {course.completionDate && (
                  <p className="font-label-sm lowercase text-on-surface-variant">
                    completed on{' '}
                    {new Date(course.completionDate).toLocaleDateString(
                      'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                  </p>
                )}
              </div>
              <button
                className="ml-auto rounded-full border border-primary/20 px-5 py-2 font-label-sm lowercase text-primary hover:bg-primary/5"
                type="button"
              >
                view certificate
              </button>
            </div>
          )}
        </div>

        {/* module list */}
        <p className="mb-3 font-label-sm uppercase text-on-surface-variant">
          modules in sequence
        </p>

        {sortedModules.length === 0 ? (
          <div className="glass-panel rounded-3xl px-6 py-10 text-center">
            <p className="font-body-md lowercase text-on-surface-variant">
              no modules available yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedModules.map((module) => (
              <ModuleRow
                key={module.id}
                module={module}
                isCompleted={module.order <= completedCount}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default LearnerCoursePage

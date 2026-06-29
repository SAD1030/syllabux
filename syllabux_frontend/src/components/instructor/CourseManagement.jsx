import { useState } from 'react'
import InstructorCourseCard from './InstructorCourseCard'
import InstructorModuleList from './InstructorModuleList'

function CourseManagement({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section className="flex flex-col gap-6 md:col-span-8">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md text-primary">
          course management
        </h3>
        <button
          className="flex items-center gap-1 font-label-md text-label-md text-primary hover:underline"
          type="button"
        >
          view all <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <InstructorCourseCard
            key={course.id}
            course={course}
            onViewModules={setSelectedCourse}
          />
        ))}
      </div>

      {selectedCourse && (
        <InstructorModuleList
          courseTitle={selectedCourse.title}
          modules={selectedCourse.modules ?? []}
        />
      )}
    </section>
  )
}

export default CourseManagement

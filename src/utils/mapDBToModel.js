const mapDBToModelCourses = ({
  course_id,
  title,
  sign_pict_link,
  description,
  created_at,
  updated_at
}) => ({
  id: course_id,
  title,
  imageUrl: sign_pict_link,
  description,
  createdAt: created_at,
  updatedAt: updated_at
})

const mapDBToModelChallenges = ({
  id,
  title,
  description,
  course_id,
  answer  
}) => ({
  id,
  title,
  description,
  courseId: course_id,
  answer
})

module.exports = {
  mapDBToModelCourses,
  mapDBToModelChallenges
}
const mapDBToModelCourses = ({
	course_id,
	title,
	sign_pict_link,
	description,
	created_at,
	updated_at,
	type
}) => ({
	id: course_id,
	title,
	imageUrl: sign_pict_link,
	description,
	createdAt: created_at,
	updatedAt: updated_at,
	type
})

const mapDBToModelChallenges = ({
	challenge_id,
	title,
	description,
	course_id,
	answer,
	type
}) => ({
	challenge_id,
	title,
	description,
	courseId: course_id,
	answer,
	type
})

module.exports = {
	mapDBToModelCourses,
	mapDBToModelChallenges
}

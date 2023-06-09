const mapDBToModelCourses = ({
	course_id,
	title,
	type,
	sign_pict_link,
	description,
	created_at,
	updated_at,
}) => ({
	id: course_id,
	title,
	type,
	image_url: sign_pict_link,
	description,
	created_at,
	updated_at,
})

const mapDBToModelChallenges = ({
	challenge_id,
	title,
	description,
	course_id,
	answer,
	type,
	created_at,
	updated_at
}) => ({
	id: challenge_id,
	title,
	description,
	course_id,
	answer,
	type,
	created_at,
	updated_at
})

module.exports = {
	mapDBToModelCourses,
	mapDBToModelChallenges
}

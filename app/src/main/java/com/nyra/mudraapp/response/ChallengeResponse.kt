package com.nyra.mudraapp.response

import com.google.gson.annotations.SerializedName

data class ChallengeResponse(

	@field:SerializedName("data")
	val data: DataChallenge,

	@field:SerializedName("status")
	val status: String
)

data class ChallengesItem(

	@field:SerializedName("course_id")
	val courseId: String,

	@field:SerializedName("answer")
	val answer: String,

	@field:SerializedName("updated_at")
	val updatedAt: String,

	@field:SerializedName("description")
	val description: String,

	@field:SerializedName("created_at")
	val createdAt: String,

	@field:SerializedName("id")
	val id: String,

	@field:SerializedName("title")
	val title: String,

	@field:SerializedName("type")
	val type: String
)

data class DataChallenge(

	@field:SerializedName("challenges")
	val challenges: List<ChallengesItem>
)

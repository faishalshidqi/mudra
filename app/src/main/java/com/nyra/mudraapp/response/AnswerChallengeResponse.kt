package com.nyra.mudraapp.response

import com.google.gson.annotations.SerializedName

data class AnswerChallengeResponse(

	@SerializedName("response")
	val response: List<ResponseItem>,

	@SerializedName("status")
	val status: String
)

data class ResponseItem(

	@SerializedName("Huruf")
	val huruf: String,

	@SerializedName("label_id")
	val labelId: String,

	@SerializedName("probability")
	val probability: String,
)

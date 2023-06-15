package com.nyra.mudraapp.response

import com.google.gson.annotations.SerializedName

data class CourseResponse(

	@field:SerializedName("data")
	val data: Data,

	@field:SerializedName("status")
	val status: String
)

data class CoursesItem(

	@field:SerializedName("updated_at")
	val updatedAt: String,

	@field:SerializedName("image_url")
	val imageUrl: String,

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

data class Data(

	@field:SerializedName("courses")
	val courses: List<CoursesItem>
)

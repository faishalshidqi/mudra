package com.nyra.mudraapp.retrofit

import com.nyra.mudraapp.response.*
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @JvmSuppressWildcards
    @GET("courses")
    fun getCourseByType(@Query("type") type: String): Call<CourseResponse>

    @JvmSuppressWildcards
    @GET("challenges")
    fun getChallenge(): Call<ChallengeResponse>
}
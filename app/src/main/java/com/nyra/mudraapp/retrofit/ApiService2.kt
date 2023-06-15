package com.nyra.mudraapp.retrofit

import com.nyra.mudraapp.response.AnswerChallengeResponse
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService2 {
    @Multipart
    @POST("predict")
    suspend fun uploadImgChallenge(
        @Part file: MultipartBody.Part,
        @Part("type") type: RequestBody
    ): AnswerChallengeResponse
}
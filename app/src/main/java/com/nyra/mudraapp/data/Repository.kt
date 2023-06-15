package com.nyra.mudraapp.data

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.nyra.mudraapp.response.CourseResponse
import com.nyra.mudraapp.retrofit.ApiService
import com.nyra.mudraapp.utils.Result
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Repository(private val apiService: ApiService) {

    fun getCourseByType(type: String): Pair<LiveData<CourseResponse>, LiveData<Result<Boolean>>> {
        val result = MutableLiveData<CourseResponse>()
        val progress = MutableLiveData<Result<Boolean>>()

        progress.value = Result.Loading

        apiService.getCourseByType(type).enqueue(object : Callback<CourseResponse> {
            override fun onResponse(call: Call<CourseResponse>, response: Response<CourseResponse>) {
                if (response.isSuccessful) {
                    result.value = response.body()
                    progress.value = Result.Success(true)
                }
            }

            override fun onFailure(call: Call<CourseResponse>, t: Throwable) {
                Log.d("error", t.message.toString())
                progress.value = Result.Error(t.message.toString())
            }
        })

        return Pair(result, progress)
    }
}
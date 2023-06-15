package com.nyra.mudraapp.ui.challenge

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.nyra.mudraapp.response.*
import com.nyra.mudraapp.retrofit.ApiConfig
import com.nyra.mudraapp.retrofit.ApiConfig2
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File

class ChallengeViewModel : ViewModel() {
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _uploadResponse = MutableLiveData<AnswerChallengeResponse>()
    val uploadResponse: LiveData<AnswerChallengeResponse> = _uploadResponse

    private val _challengeResponse = MutableLiveData<ChallengeResponse>()
    val getChallengeResponse: LiveData<ChallengeResponse> = _challengeResponse

    private val _error = MutableLiveData<String>()
    val error: LiveData<String>
        get() = _error

    suspend fun uploadChallenge(image: File, type: String) {
        if (image == null || type == null) {
            _error.value = "Gambar atau jenis bahasa isyarat tidak tersedia"
            return
        }

        val typeRequestBody = type.toRequestBody("text/plain".toMediaTypeOrNull())
        val requestImageFile = image.asRequestBody("image/jpeg".toMediaType())
        val imageMultipart = MultipartBody.Part.createFormData(
            "gambar", image.name, requestImageFile
        )

        _isLoading.value = true
        try {
            val response = ApiConfig2.apiServiceAnswer().uploadImgChallenge(imageMultipart, typeRequestBody)
            _uploadResponse.value = response
        } catch (e : Exception) {
            _error.value = "Gagal upload foto: ${e.message}"
        } finally {
            _isLoading.value = false
        }
    }

    fun getChallenge() {
        _isLoading.value = true
        val client = ApiConfig.apiService().getChallenge()
        client.enqueue(object : Callback<ChallengeResponse> {
            override fun onResponse(call: Call<ChallengeResponse>, response: Response<ChallengeResponse>) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    val challengeResponse = response.body()
                    _challengeResponse.value = challengeResponse!!
                }
                else {
                    _error.value = "Gagal mendapatkan data challenge : ${response.message()}"
                }
            }

            override fun onFailure(call: Call<ChallengeResponse>, t: Throwable) {
                _isLoading.value = false
                _error.value = "Gagal mendapatkan data challenge: ${t.message}"
            }
        })
    }
}
package com.nyra.mudraapp.di

import android.content.Context
import com.nyra.mudraapp.data.Repository
import com.nyra.mudraapp.retrofit.ApiConfig

object Injection {
    fun provideRepository(context: Context): Repository {
        val apiService = ApiConfig.apiService()

        return Repository(apiService)
    }
}
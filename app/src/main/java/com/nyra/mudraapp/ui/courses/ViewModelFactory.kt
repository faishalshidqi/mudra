package com.nyra.mudraapp.ui.courses

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.nyra.mudraapp.di.Injection

class ViewModelFactory(private val context: Context) : ViewModelProvider.NewInstanceFactory() {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {

            modelClass.isAssignableFrom(CoursesViewModel::class.java) -> {
                CoursesViewModel(Injection.provideRepository(context)) as T
            }

            else -> throw IllegalArgumentException("Unknown ViewModel class: " + modelClass.name)
        }
    }
}
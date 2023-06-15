package com.nyra.mudraapp.ui.courses

import androidx.lifecycle.ViewModel
import com.nyra.mudraapp.data.Repository

class CoursesViewModel(private val repository: Repository) : ViewModel() {

    fun getCourseByType(type: String) = repository.getCourseByType(type)

}
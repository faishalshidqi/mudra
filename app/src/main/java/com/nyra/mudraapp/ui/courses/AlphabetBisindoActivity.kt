package com.nyra.mudraapp.ui.courses

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.nyra.mudraapp.databinding.ActivityAlphabetBisindoBinding
import com.nyra.mudraapp.databinding.ItemCoursesBinding
import com.nyra.mudraapp.response.Course
import com.nyra.mudraapp.ui.detail.DetailBisindoActivity
import com.nyra.mudraapp.utils.Result

class AlphabetBisindoActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAlphabetBisindoBinding
    private lateinit var bind: ItemCoursesBinding
    private lateinit var bisindoViewModel: CoursesViewModel
    private var TAG = "HBB"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAlphabetBisindoBinding.inflate(layoutInflater)
        setContentView(binding.root)
        bind = ItemCoursesBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val actionbar = supportActionBar
        actionbar!!.title = "Abjad BISINDO"

        setupViewModel()

        bisindoViewModel.getCourseByType("BISINDO").first.observe(this) { data ->
            if (data != null) {
                binding.rvBisindo.apply {
                    layoutManager = LinearLayoutManager(this@AlphabetBisindoActivity)
                    adapter = CoursesAdapter(data.data)
                }
            }
        }
        bisindoViewModel.getCourseByType("BISINDO").second.observe(this) {
            when (it) {
                is Result.Success<*> -> {
                    binding.progressBar.visibility = View.GONE
                }

                is Result.Error -> {
                    Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                    Log.e("Error", it.error)
                }

                is Result.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                }
            }
        }

        bind.constraintLayoutCourses.setOnClickListener {
            val intent = Intent(this@AlphabetBisindoActivity, DetailBisindoActivity::class.java)
            Log.d(TAG, "onCreate: ")
            startActivity(intent)
        }

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }

    private fun setupViewModel() {
        bisindoViewModel = ViewModelProvider(
            this,
            ViewModelFactory(this)
        ).get(CoursesViewModel::class.java)
    }

    private fun onItemClick(course: Course) {
        val intent = Intent(this, DetailBisindoActivity::class.java).apply {
            putExtra(DetailBisindoActivity.EXTRA_NAME, course.title)
            putExtra(DetailBisindoActivity.EXTRA_PHOTO_URL, course.image_url)
            putExtra(DetailBisindoActivity.EXTRA_DESCRIPTION, course.description)
        }
        startActivity(intent)
    }
}
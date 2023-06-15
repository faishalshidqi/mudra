package com.nyra.mudraapp.ui.courses

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.nyra.mudraapp.databinding.ActivityAlphabetAslBinding
import com.nyra.mudraapp.utils.Result

class AlphabetAslActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAlphabetAslBinding
    private lateinit var aslViewModel: CoursesViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAlphabetAslBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val actionbar = supportActionBar
        actionbar!!.title = "Abjad ASL"

        setupViewModel()

        aslViewModel.getCourseByType("ASL").first.observe(this) { data ->
            if (data != null) {
                binding.rvAsl.apply {
                    layoutManager = LinearLayoutManager(this@AlphabetAslActivity)
                    adapter = CoursesAdapter(data.data)
                }
            }
        }
        aslViewModel.getCourseByType("ASL").second.observe(this) {
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

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }

    private fun setupViewModel() {
        aslViewModel = ViewModelProvider(
            this,
            ViewModelFactory(this)
        ).get(CoursesViewModel::class.java)
    }
}
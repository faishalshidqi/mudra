package com.nyra.mudraapp.ui.courses

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.nyra.mudraapp.databinding.ActivityAlphabetSibiBinding
import com.nyra.mudraapp.utils.Result

class AlphabetSibiActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAlphabetSibiBinding
    private lateinit var sibiViewModel: CoursesViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAlphabetSibiBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val actionbar = supportActionBar
        actionbar!!.title = "Abjad SIBI"

        setupViewModel()

        sibiViewModel.getCourseByType("SIBI").first.observe(this) { data ->
            if (data != null) {
                binding.rvSibi.apply {
                    layoutManager = LinearLayoutManager(this@AlphabetSibiActivity)
                    adapter = CoursesAdapter(data.data)
                }
            }
        }
        sibiViewModel.getCourseByType("SIBI").second.observe(this) {
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
        sibiViewModel = ViewModelProvider(
            this,
            ViewModelFactory(this)
        ).get(CoursesViewModel::class.java)
    }
}
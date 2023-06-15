package com.nyra.mudraapp.ui.detail

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.bumptech.glide.Glide
import com.nyra.mudraapp.databinding.ActivityDetailAslBinding

class DetailAslActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDetailAslBinding

    companion object {
        const val EXTRA_NAME = "extra_name"
        const val EXTRA_PHOTO_URL = "extra_photo"
        const val EXTRA_DESCRIPTION = "extra_description"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityDetailAslBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val name = intent.getStringExtra(EXTRA_NAME)
        val photoUrl = intent.getStringExtra(EXTRA_PHOTO_URL)
        val description = intent.getStringExtra(EXTRA_DESCRIPTION)

        binding.titleDetailAsl.text = name
        Glide.with(this)
            .load(photoUrl)
            .skipMemoryCache(true)
            .into(binding.imgDetailAsl)
        binding.detailAslDescription.text = description
    }
}
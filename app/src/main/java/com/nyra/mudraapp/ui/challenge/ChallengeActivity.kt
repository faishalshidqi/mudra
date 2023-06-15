package com.nyra.mudraapp.ui.challenge

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import com.nyra.mudraapp.R
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.lifecycle.lifecycleScope
import com.nyra.mudraapp.databinding.ActivityChallengeBinding
import com.nyra.mudraapp.response.ChallengesItem
import com.nyra.mudraapp.utils.createTempFile
import com.nyra.mudraapp.utils.reduceFileImage
import kotlinx.coroutines.launch
import java.io.File

class ChallengeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityChallengeBinding
    private val challengeViewModel by viewModels<ChallengeViewModel>()
    private lateinit var currentPhotoPath: String

    private var getFile: File? = null

    private var abjad: String = ""

    private var currentChallengeIndex = 0

    private var isUploadDialogShown = false
    private var isCorrectDialogShown = false
    private var isErrorDialogShown = false

    private lateinit var challenges: List<ChallengesItem>

    companion object {
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
        private const val REQUEST_CODE_PERMISSIONS = 10
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (!allPermissionsGranted()) {
                Toast.makeText(
                    this,
                    "Terjadi kegagalan",
                    Toast.LENGTH_SHORT
                ).show()
                finish()
            }
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val action = supportActionBar
        action!!.title = "Challenges"

        binding = ActivityChallengeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (!allPermissionsGranted()) {
            ActivityCompat.requestPermissions(
                this,
                REQUIRED_PERMISSIONS,
                REQUEST_CODE_PERMISSIONS
            )
        }

        challengeViewModel.getChallengeResponse.observe(this) { response ->
            if (response != null) {
                challenges = response.data.challenges
                if (challenges.isNotEmpty()) {
                    if (currentChallengeIndex < challenges.size) {
                        abjad = challenges[currentChallengeIndex].title
                        uiInit()
                    } else {
                        val dialog = AlertDialog.Builder(this).apply {
                            setTitle("Yeay, Selamat !")
                            setMessage("Anda telah berhasil mengerjakan semua tantangan ini dengan benar.")
                            setCancelable(false)
                            setPositiveButton("OK") { dialog, _ ->
                                dialog.dismiss()
                                finish()
                            }
                        }.create()
                        dialog.show()
                    }
                }
            }
        }
        challengeViewModel.getChallenge()

        binding.captureImg.setOnClickListener {
            startTakePhoto()
        }

        binding.btnNext.setOnClickListener {
            if (getFile != null) {
                currentChallengeIndex++
                if (currentChallengeIndex < challenges.size) {
                    abjad = challenges[currentChallengeIndex].title
                    uiInit()

                    getFile = null
                    binding.previewImg.setImageDrawable(null)
                } else {
                    val dialog = AlertDialog.Builder(this).apply {
                        setTitle("Yeay, Selamat !")
                        setMessage("Anda telah berhasil mengerjakan semua tantangan ini dengan benar.")
                        setCancelable(false)
                        setPositiveButton("OK") { dialog, _ ->
                            dialog.dismiss()
                            finish()
                        }
                    }.create()
                    dialog.show()
                }
            } else {
                Toast.makeText(this, "Masukkan gambar terlebih dahulu !", Toast.LENGTH_SHORT).show()
            }
        }

        binding.btnUnggah.setOnClickListener {
            if (getFile != null) {
                val file = reduceFileImage(getFile as File)
                val detectedLanguage = getAutoDetectedLanguage()

                lifecycleScope.launch {
                    challengeViewModel.uploadChallenge(file, detectedLanguage)
                }
            } else {
                Toast.makeText(this, "Gambar tidak tersedia", Toast.LENGTH_SHORT).show()
            }

            challengeViewModel.uploadResponse.observe(this) { validation ->
                if (validation != null) {
                    val responseList = validation.response
                    if (responseList.isNotEmpty()) {
                        if (validation.status == "success") {
                            val dialog = AlertDialog.Builder(this).apply {
                                setTitle("Jawaban Benar !")
                                setMessage("Ayo ke tantangan selanjutnya dengan klik tanda panah di pojok bawah kanan.")
                                setCancelable(false)
                                setPositiveButton("OK") { dialog, _ ->
                                    dialog.dismiss()
                                    binding.btnNext.visibility = View.VISIBLE
                                    isUploadDialogShown = false
                                    isCorrectDialogShown = true
                                    isErrorDialogShown = false
                                }
                            }.create()
                            dialog.show()
                            isUploadDialogShown = true
                        } else {
                            val dialog = AlertDialog.Builder(this).apply {
                                setTitle("Jawaban Salah !")
                                setMessage("Ayo coba lagi ! Jangan pantang menyerah ya !")
                                setCancelable(false)
                                setPositiveButton("OK") { dialog, _ ->
                                    dialog.dismiss()
                                    getFile = null
                                    binding.previewImg.setImageDrawable(null)
                                    isUploadDialogShown = false
                                    isCorrectDialogShown = true
                                    isErrorDialogShown = false
                                }
                            }.create()
                            dialog.show()
                            isErrorDialogShown = false
                        }
                    }
                }
            }
        }

        challengeViewModel.isLoading.observe(this) {
            showLoading(it)
        }
    }

    private fun startTakePhoto() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        intent.resolveActivity(packageManager)

        createTempFile(application).also {
            val photoURI: Uri = FileProvider.getUriForFile(
                this@ChallengeActivity, "com.nyra.mudraapp.ui.challenge", it
            )
            currentPhotoPath = it.absolutePath
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI)
            launcherIntentCamera.launch(intent)
        }
    }

    private val launcherIntentCamera = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) {
        if (it.resultCode == RESULT_OK) {
            val myFile = File(currentPhotoPath)

            myFile.let { file ->
                getFile = file
                binding.previewImg.setImageBitmap(BitmapFactory.decodeFile(file.path))
            }

            Log.d("ChallengeActivity", "Image path : ${myFile.absolutePath}")
        }
    }

    private fun uiInit() {
        val questionText = getString(R.string.challenge_ask, abjad)
        binding.tvQuestion.text = questionText
    }

    private fun getAutoDetectedLanguage(): String {
        val timeStamp = System.currentTimeMillis()

        val detectedLanguage = when (timeStamp % 3) {
            0L -> "ASL"
            1L -> "BISINDO"
            else -> "SIBI"
        }
        return detectedLanguage
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) {
            binding.progressBar.visibility = View.VISIBLE
        } else {
            binding.progressBar.visibility = View.GONE
        }
    }

    override fun onBackPressed() {
        finishAffinity()
    }
}
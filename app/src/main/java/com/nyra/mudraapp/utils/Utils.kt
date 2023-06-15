package com.nyra.mudraapp.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Environment
import java.io.*
import java.text.SimpleDateFormat
import java.util.*

private const val FORMAT_FILENAME = "dd-MMM-yyyy"
private const val MAXIMAL_SIZE = 1000000 //-> Ukuran File

val timeStamp: String = SimpleDateFormat(
    FORMAT_FILENAME,
    Locale.US
).format(System.currentTimeMillis())

//IntentCamera
fun createTempFile(context: Context): File {
    val storageDir: File? = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
    return File.createTempFile(timeStamp, ".jpg", storageDir)
}

//Ukuran File
fun reduceFileImage(file: File): File {
    val bitmap = BitmapFactory.decodeFile(file.path)
    var compressQuality = 100
    var streamLength: Int
    do {
        val bmpStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, compressQuality, bmpStream)
        val bmpPicByteArray = bmpStream.toByteArray()
        streamLength = bmpPicByteArray.size
        compressQuality -= 5
    } while (streamLength > MAXIMAL_SIZE)
    bitmap.compress(Bitmap.CompressFormat.JPEG, compressQuality, FileOutputStream(file))
    return file
}
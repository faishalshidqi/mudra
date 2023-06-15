package com.nyra.mudraapp.ui.courses

import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.nyra.mudraapp.databinding.ItemCoursesBinding
import com.nyra.mudraapp.response.Data
import com.nyra.mudraapp.ui.detail.DetailBisindoActivity

class CoursesAdapter(private val data: Data) :
    RecyclerView.Adapter<CoursesAdapter.CourseViewHolder>() {

    class CourseViewHolder(var binding: ItemCoursesBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CourseViewHolder {
        val binding = ItemCoursesBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CourseViewHolder(binding)
    }

    override fun getItemCount(): Int = data.courses?.size ?: 0

    override fun onBindViewHolder(holder: CourseViewHolder, position: Int) {
        val course = data.courses?.get(position)

        holder.itemView.setOnClickListener{
            Log.d("HBB", "onBindViewHolder: ")
            val intent = Intent(holder.itemView.context, DetailBisindoActivity::class.java)
            intent.putExtra("extra_photo", data.courses.get(position).imageUrl)
            intent.putExtra("extra_name", data.courses.get(position).title)
            intent.putExtra("extra_description", data.courses.get(position).description)
            Log.d("HBB", "onCreate: " + data.courses.get(position).imageUrl)
            holder.itemView.context.startActivity(intent)
        }

        with(holder.binding) {
            alphabet.text = course?.title
            Glide.with(holder.itemView.context)
                .load(course?.imageUrl)
                .into(image)
            descriptionCourse.text = course?.description
        }
    }
}
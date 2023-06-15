package com.nyra.mudraapp.ui.courses

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import com.nyra.mudraapp.R

class CourseFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return inflater.inflate(R.layout.fragment_course, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val btnCourse1: ConstraintLayout = view.findViewById(R.id.list_menu_sibi)
        val btnCourse2: ConstraintLayout = view.findViewById(R.id.list_menu_bisindo)
        val btnCourse3: ConstraintLayout = view.findViewById(R.id.list_menu_asl)

        btnCourse1.setOnClickListener {
            val intent = Intent(activity, AlphabetSibiActivity::class.java)
            startActivity(intent)
        }
        btnCourse2.setOnClickListener {
            val intent = Intent(activity, AlphabetBisindoActivity::class.java)
            startActivity(intent)
        }
        btnCourse3.setOnClickListener {
            val intent = Intent(activity, AlphabetAslActivity::class.java)
            startActivity(intent)
        }
    }
}
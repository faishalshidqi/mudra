package com.nyra.mudraapp.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.cardview.widget.CardView
import androidx.fragment.app.Fragment
import com.nyra.mudraapp.R
import com.nyra.mudraapp.ui.challenge.ChallengeActivity
import com.nyra.mudraapp.ui.courses.CourseFragment

class HomeFragment : Fragment(), View.OnClickListener {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val btnCourse: CardView = view.findViewById(R.id.list_menu_course)
        val btnChallenge: CardView = view.findViewById(R.id.list_menu_challenge)

        btnCourse.setOnClickListener(this)
        btnChallenge.setOnClickListener {
            val intent = Intent(activity, ChallengeActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onClick(v: View) {
        if (v.id == R.id.list_menu_course) {
            val courseFragment = CourseFragment()
            val fragmentManager = parentFragmentManager
            fragmentManager.beginTransaction().apply {
                replace(R.id.nav_host_fragment_activity_main, courseFragment, CourseFragment::class.java.simpleName)
                addToBackStack(null)
                commit()
            }
        }
    }

}
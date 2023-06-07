import Navigation from "../../../../components/Navigation"
import NavigationItem from "../../../../components/NavigationItem"
import Layout from "../../../../components/layout"
import CourseForm from "../../../../components/CourseForm"
import fetchApi from "../../../../lib/FetchApi";

export default function EditForm({ course }) {
  return (
      <Layout>
        <Navigation>
          <NavigationItem href='/'>Dashboard</NavigationItem>
          <NavigationItem href='/courses'>Courses</NavigationItem>
          <NavigationItem href={`/courses/detail/${course.course_id}`} isActive>Back to Detail Course</NavigationItem>
          <NavigationItem href='/challenges'>Challenges</NavigationItem>
          <NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
        </Navigation>
        <CourseForm className="mr-2" courseData={course}></CourseForm>
      </Layout>
  )
}
export async function getStaticPaths() {
  const id = await fetchApi.getCoursesId()
  const paths = id.map((id) => ({params: {id: id}}));
  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params }){
  const { course } = await fetchApi.getCoursesById(params.id)
  return {
    props: {
      course: course ?? null
    }
  }
}
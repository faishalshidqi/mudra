import Navigation from "../../../../components/Navigation"
import NavigationItem from "../../../../components/NavigationItem"
import RootLayout from "../../../../components/RootLayout"
import CourseForm from "../../../../components/CourseForm"
import fetchApi from "../../../../lib/FetchApi"
import {useRouter} from "next/router"
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import Custom404Page from "../../../../components/Custom404Page";
export default function EditForm() {
	const router = useRouter()
	const {id} = router.query
	const {data, error, isLoading} = useSWR(`${id}`, fetchApi.getCoursesById)

	if (isLoading) {
		return (
			<Loading />
		)
	}

	if (!data && error) {
		return (
			<Custom404Page message="Cannot get course data. ID not found"/>
		)
	}
	const {course} = data
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href={`/courses/detail/${course.course_id}`} isActive>Back to Detail Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<CourseForm className="mr-2" courseData={course}></CourseForm>
		</RootLayout>
	)
}
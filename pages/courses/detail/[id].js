import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import DetailCourse from "../../../components/DetailCourse"
import useSWR from "swr"
import Loading from "../../../components/Loading";
import Custom404Page from "../../../components/Custom404Page";

export default function Detail() {
	const router = useRouter()
	const {id} = router.query
	const { data, error, isLoading } = useSWR(`${id}`, fetchApi.getCoursesById)
	if (!data && error) {
		return (
			<Custom404Page message="Cannot get course data. ID not found" />
		)
	}
	if (isLoading) {
		return (
			<Loading />
		)
	}
	const {course} = data
	return(
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses' isActive>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<DetailCourse className="mr-2" courseData={course}></DetailCourse>
		</RootLayout>
	)
}

// export async function getStaticPaths() {
// 	const id = await fetchApi.getCoursesId()
// 	const paths = id.map((id) => ({params: {id: id}}))
// 	return {
// 		paths,
// 		fallback: false,
// 	}
// }
// export async function getStaticProps({ params }){
// 	const { course } = await fetchApi.getCoursesById(params.id)
// 	return {
// 		props: {
// 			course: course ?? null
// 		}
// 	}
// }

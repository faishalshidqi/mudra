import Layout from "../../components/RootLayout"
import ListItem from "../../components/ListItem"
import List from "../../components/List"
import NavigationItem from "../../components/NavigationItem"
import Navigation from "../../components/Navigation"
import fetchApi from "../../lib/FetchApi"
import {useRouter} from "next/router"
import useSWR from "swr"
import Custom404Page from "../../components/Custom404Page";
import Loading from "../../components/Loading";

// export async function getStaticProps() {
// 	// const courseData = await fetchApi.getAllCourses()
//
// 	return {
// 		props: {
// 			courseData
// 		}
// 	}
// }
export default function CoursesList() {
	const { data, error, isLoading } = useSWR(`${process.env.API_URL}/kll/courses`, fetchApi.getAllCourses)

	const router = useRouter()
	if (isLoading) {
		return (
			<Loading />
		)
	}
	if (!data && error) {
		return (
			<Custom404Page message="Can't found any Courses data" />
		)
	}
	return (
		<Layout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses' isActive>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<List>
				{data?.courses.map((data) => (
					<ListItem key={data.course_id} context={data} />
				))}
			</List>
		</Layout>
	)
}

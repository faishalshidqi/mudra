import RootLayout from "../../components/RootLayout"
import ListItem from "../../components/ListItem"
import List from "../../components/List"
import NavigationItem from "../../components/NavigationItem"
import Navigation from "../../components/Navigation"
import fetchApi from "../../lib/FetchApi"
import {useRouter} from "next/router"


export async function getStaticProps() {
	const courseData = await fetchApi.getAllCourses()
	return {
		props: {
			courseData
		}
	}
}
export default function CoursesList({ courseData }) {
	const router = useRouter()
	if(router.isFallback) {
		return (
			<div
				className="m-56 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status">
				<span
					className=" !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
				</span>
			</div>
		)
	}
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses' isActive>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<List>
				{courseData["courses"].map((data) => (
					<ListItem key={data.course_id} context={data} />
				))}
			</List>
		</RootLayout>
	)
}

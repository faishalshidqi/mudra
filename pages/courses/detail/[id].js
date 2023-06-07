import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import DetailCourse from "../../../components/DetailCourse"

export default function Detail({ course }) {
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

export async function getStaticPaths() {
	const id = await fetchApi.getCoursesId()
	const paths = id.map((id) => ({params: {id: id}}))
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
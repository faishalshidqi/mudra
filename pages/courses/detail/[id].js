import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import Layout from "../../../components/layout"
import DetailCourse from "../../../components/DetailCourse"

export default function Detail({ data }) {
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
		<Layout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses' isActive>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
			</Navigation>
			<DetailCourse className="mr-2" courseData={data}></DetailCourse>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = fetchApi.getCoursesId()
	return {
		paths,
		fallback: true,
	}
}
export async function getStaticProps({ params }){
	const { course: data } = fetchApi.getCoursesById(params.id)
	return {
		props: {
			data
		}
	}
}

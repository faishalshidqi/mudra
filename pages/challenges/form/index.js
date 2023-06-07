import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import ChallengeForm from "../../../components/ChallengeForm"
import FetchApi from "../../../lib/FetchApi"

export async function getStaticProps() {
	const { courses } =  await FetchApi.getCoursesInfo()
	return {
		props: {
			courses
		}
	}
}
export default function Form({courses}) {
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form' isActive>Add New Challenge</NavigationItem>
			</Navigation>
			<ChallengeForm className="mr-2" courses={courses}></ChallengeForm>
		</RootLayout>
	)
}

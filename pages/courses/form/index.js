import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import Layout from "../../../components/layout"
import CourseForm from "../../../components/CourseForm"

export default function Form() {
	return (
		<Layout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form' isActive>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
			</Navigation>
			<CourseForm className="mr-2"></CourseForm>
		</Layout>
	)
}
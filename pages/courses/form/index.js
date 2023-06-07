import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import CourseForm from "../../../components/CourseForm"

export default function Form() {
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form' isActive>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<CourseForm className="mr-2"></CourseForm>
		</RootLayout>
	)
}

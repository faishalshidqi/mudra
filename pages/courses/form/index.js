import Navigation from "../../../components/Navigation";
import NavigationItem from "../../../components/NavigationItem";
import Layout from "../../../components/layout";
import AddCourseForm from "../../../components/AddCourseForm";

export default function CourseForm() {
    return (
        <Layout>
            <Navigation>
                <NavigationItem href='/'>Dashboard</NavigationItem>
                <NavigationItem href='/courses'>Courses</NavigationItem>
                <NavigationItem href='/courses/form' isActive>Add New Course</NavigationItem>
                <NavigationItem href='/challenges'>Challenges</NavigationItem>
            </Navigation>
            <AddCourseForm className="mr-2"></AddCourseForm>
        </Layout>
    )
}
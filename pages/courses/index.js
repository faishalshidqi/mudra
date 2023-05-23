import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";
import List from "../../components/List";
import NavigationItem from "../../components/NavigationItem";
import Navigation from "../../components/Navigation";
import fetchApi from "../../lib/FetchApi";

export async function getStaticProps() {
    const courseData = await fetchApi.getAllCourses()
    return {
        props: {
            courseData
        }
    }
}
export default function CoursesList({ courseData }) {
    return (
        <Layout>
            <Navigation>
                <NavigationItem href='/'>Dashboard</NavigationItem>
                <NavigationItem href='/courses' isActive>Courses</NavigationItem>
                <NavigationItem href='/courses/form'>Add New Course</NavigationItem>
                <NavigationItem href='/challenges'>Challenges</NavigationItem>
            </Navigation>
            <List>
                {courseData['courses'].map((data) => (
                    <ListItem key={data.course_id} context={data} />
                ))}
            </List>
            // todo: create add new courses form
        </Layout>
    )
}

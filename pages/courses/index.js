import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";
import List from "../../components/List";
import NavigationItem from "../../components/NavigationItem";
import Navigation from "../../components/Navigation";
import fetchApi from "../../lib/FetchApi";

export async function getStaticProps() {
    const courseData = await fetchApi.getAllCourses()
    console.log(courseData['courses'])
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
                <NavigationItem href='/challenges'>Challenges</NavigationItem>
            </Navigation>
            <List>
                {courseData['courses'].map((data) => (
                    <ListItem key={data.course_id} context={data} />
                ))}
                <ListItem key='asaasasas' context='asasa'/>
                <ListItem key='123' context='123'/>
            </List>
        </Layout>
    )
}

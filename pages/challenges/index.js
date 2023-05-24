import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";
import List from "../../components/List";
import NavigationItem from "../../components/NavigationItem";
import Navigation from "../../components/Navigation";
import fetchApi from "../../lib/FetchApi";

export async function getStaticProps() {
    const challengesData = await fetchApi.getAllChallenges()
    return {
        props: {
            challengesData
        }
    }
}
export default function CoursesList({ challengesData }) {
    return (
        <Layout>
            <Navigation>
                <NavigationItem href='/'>Dashboard</NavigationItem>
                <NavigationItem href='/courses'>Courses</NavigationItem>
                <NavigationItem href='/challenges' isActive>Challenges</NavigationItem>
            </Navigation>
            <List>
                {challengesData['challenges'].map((data) => (
                    <ListItem key={data.challenges_id} context={data} />
                ))}
            </List>
            //todo: create add new challenges form
        </Layout>
    )
}
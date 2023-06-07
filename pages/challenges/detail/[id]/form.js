import Navigation from "../../../../components/Navigation"
import NavigationItem from "../../../../components/NavigationItem"
import Layout from "../../../../components/layout"
import ChallengeForm from "../../../../components/ChallengeForm"
import fetchApi from "../../../../lib/FetchApi";

export default function EditForm({ challenge, courses }) {
    return (
        <Layout>
            <Navigation>
                <NavigationItem href='/'>Dashboard</NavigationItem>
                <NavigationItem href='/courses'>Courses</NavigationItem>
                <NavigationItem href='/challenges'>Challenges</NavigationItem>
                <NavigationItem href={`/courses/detail/${challenge.challenge_id}`} isActive>Back to Detail Challenge</NavigationItem>
            </Navigation>
            <ChallengeForm className="mr-2" challengeData={challenge} courses={courses}></ChallengeForm>
        </Layout>
    )
}
export async function getStaticPaths() {
    const id = await fetchApi.getChallengesId()
    const paths = id.map((id) => ({params: {id: id}}));
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }){
    const { challenge } = await fetchApi.getChallengeById(params.id)
    const { courses } = await  fetchApi.getCoursesInfo()
    return {
        props: {
            challenge: challenge ?? null,
            courses
        }
    }
}
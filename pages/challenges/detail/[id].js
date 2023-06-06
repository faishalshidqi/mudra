import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import Layout from "../../../components/layout"
import DetailChallenge from "../../../components/DetailChallenge"

export default function Detail({ challenge }) {
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
                <NavigationItem href='/courses'>Courses</NavigationItem>
                <NavigationItem href='/courses/form'>Add New Course</NavigationItem>
                <NavigationItem href='/challenges' isActive>Challenges</NavigationItem>
                <NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
            </Navigation>
            <DetailChallenge className="mr-2" challengeData={challenge}></DetailChallenge>
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
    return {
        props: {
            challenge: challenge ?? null
        }
    }
}

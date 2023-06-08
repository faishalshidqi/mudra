import Navigation from "../../../../components/Navigation"
import NavigationItem from "../../../../components/NavigationItem"
import RootLayout from "../../../../components/RootLayout"
import ChallengeForm from "../../../../components/ChallengeForm"
import fetchApi from "../../../../lib/FetchApi"
import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "../../../../components/Loading";
import Custom404Page from "../../../../components/Custom404Page";

export default function EditForm() {
	const router = useRouter()
	const{id} = router.query
	const {data: challengeData, error: challengeError, isLoading: loadingChallenge} = useSWR(`${id}`, fetchApi.getChallengeById)
	const {data: coursesData, error: coursesError, isLoading: loadingCourses} = useSWR(`${process.env.API_URL}/kll/courses/info`, fetchApi.getCoursesInfo)

	if (loadingChallenge || loadingCourses) {
		return (
			<Loading />
		)
	}
	if ((!challengeData && challengeError) || (!coursesData && coursesError)) {
		return (
			<Custom404Page message="Cannot get required data." />
		)
	}
	const {challenge} = challengeData
	const {courses} = coursesData
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href={`/courses/detail/${challenge.challenge_id}`} isActive>Back to Detail Challenge</NavigationItem>
			</Navigation>
			<ChallengeForm className="mr-2" challengeData={challenge} courses={courses}></ChallengeForm>
		</RootLayout>
	)
}
// export async function getStaticPaths() {
// 	const id = await fetchApi.getChallengesId()
// 	const paths = id.map((id) => ({params: {id: id}}))
// 	return {
// 		paths,
// 		fallback: false,
// 	}
// }
// export async function getStaticProps({ params }){
// 	const { challenge } = await fetchApi.getChallengeById(params.id)
// 	const { courses } = await  fetchApi.getCoursesInfo()
// 	return {
// 		props: {
// 			challenge: challenge ?? null,
// 			courses
// 		}
// 	}
// }

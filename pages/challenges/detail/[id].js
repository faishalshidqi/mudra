import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import DetailChallenge from "../../../components/DetailChallenge"
import useSWR from "swr";
import Custom404Page from "../../../components/Custom404Page";
import Loading from "../../../components/Loading";

export default function Detail() {
	const router = useRouter()
	const {id} = router.query
	const {data, error, isLoading} = useSWR(`${id}`, fetchApi.getChallengeById)

	if (isLoading) {
		return (
			<Loading />
		)
	}
	if (!data && error) {
		return (
			<Custom404Page message="Cannot get challenge data. ID not found" />
		)
	}
	const {challenge} = data
	return(
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges' isActive>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<DetailChallenge className="mr-2" challengeData={challenge}></DetailChallenge>
		</RootLayout>
	)
}

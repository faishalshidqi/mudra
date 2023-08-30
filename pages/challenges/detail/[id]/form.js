import Navigation from "../../../../components/Navigation"
import NavigationItem from "../../../../components/NavigationItem"
import RootLayout from "../../../../components/RootLayout"
import ChallengeForm from "../../../../components/ChallengeForm"
import fetchApi from "../../../../lib/FetchApi"
import useSWR from "swr"
import {useRouter} from "next/router"
import Loading from "../../../../components/Loading"
import Custom404Page from "../../../../components/Custom404Page"
import {useState} from "react";
import loginAuth from "../../../../utils/loginAuth";

const EditForm = (isAuthenticated) => {
	const [loadingToken, setLoadingToken] = useState(true)

	const { data: dataToken, error: errorToken } = useSWR(
		`${process.env.API_URL}/kll/authentications`,
		fetchApi.getAccessToken,
		{
			shouldRetryOnError: false,
			revalidateOnMount: true,
			onSuccess: () => {
				setLoadingToken(false);
			},
			onError: () => {
				setLoadingToken(false);
			},
		}
	);
	const router = useRouter()
	const{id} = router.query
	const request = {
		token: dataToken?.accessToken,
		id
	}
	const {data: challengeData, error: challengeError, isLoading: loadingChallenge} = useSWR(request, fetchApi.getChallengeById)
	const {data: coursesData, error: coursesError, isLoading: loadingCourses} = useSWR(request.token, fetchApi.getCoursesInfo)

	if (loadingChallenge || loadingCourses || loadingToken || !isAuthenticated) {
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
				<NavigationItem href={`/courses/detail/${challengeData?.challenge["challenge_id"]}`} isActive>Back to Detail Challenge</NavigationItem>
			</Navigation>
			<ChallengeForm className="mr-2" challengeData={challengeData?.challenge} courses={coursesData?.courses}></ChallengeForm>
		</RootLayout>
	)
}

export default loginAuth(EditForm)
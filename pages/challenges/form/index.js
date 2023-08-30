import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import ChallengeForm from "../../../components/ChallengeForm"
import useSWR from "swr"
import fetchApi from "../../../lib/FetchApi"
import Custom404Page from "../../../components/Custom404Page"
import Loading from "../../../components/Loading"
import {useState} from "react";
import loginAuth from "../../../utils/loginAuth";
const Form = (isAuthenticated) => {
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
	if (!dataToken && errorToken) {
		return (
			<Custom404Page message="Can't found any Courses data" />
		)
	}
	const {data, error, isLoading} = useSWR(() => (dataToken?.accessToken ? dataToken?.accessToken : ''), fetchApi.getCoursesInfo)
	if (loadingToken || !isAuthenticated || isLoading) {
		return (
			<Loading />
		)
	}
	if (!data && error) {
		return (
			<Custom404Page message="Cannot get required data." />
		)
	}
	const {courses} = data
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form' isActive>Add New Challenge</NavigationItem>
			</Navigation>
			<ChallengeForm className="mr-2" courses={courses}></ChallengeForm>
		</RootLayout>
	)
}

export default loginAuth(Form)
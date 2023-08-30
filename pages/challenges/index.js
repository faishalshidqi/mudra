import RootLayout from "../../components/RootLayout"
import ListItem from "../../components/ListItem"
import List from "../../components/List"
import NavigationItem from "../../components/NavigationItem"
import Navigation from "../../components/Navigation"
import fetchApi from "../../lib/FetchApi"
import useSWR from "swr"
import Custom404Page from "../../components/Custom404Page"
import Loading from "../../components/Loading"
import {useState} from "react";
import loginAuth from "../../utils/loginAuth";

const ChallengesList = (isAuthenticated) => {
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
	const { data, error, isLoading } = useSWR(() => (dataToken?.accessToken ? dataToken?.accessToken : ''), fetchApi.getAllChallenges)
	if (loadingToken || !isAuthenticated || isLoading) {
		return (
			<Loading />
		)
	}
	if (!data && error) {
		return (
			<Custom404Page message="Can't found any Courses data" />
		)
	}
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges' isActive>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<List>
				{data?.challenges.map((challenge) => (
					<ListItem key={challenge["challenge_id"]} context={challenge}/>
				))}
			</List>

		</RootLayout>
	)
}

export default loginAuth(ChallengesList)

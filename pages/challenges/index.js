import RootLayout from "../../components/RootLayout"
import ListItem from "../../components/ListItem"
import List from "../../components/List"
import NavigationItem from "../../components/NavigationItem"
import Navigation from "../../components/Navigation"
import fetchApi from "../../lib/FetchApi"
import useSWR from "swr";
import Custom404Page from "../../components/Custom404Page";
import Loading from "../../components/Loading";

export default function CoursesList() {
	const {data, error, isLoading} = useSWR(`${process.env.API_URL}/kll/challenges`, fetchApi.getAllChallenges)

	if (isLoading) {
		return (
			<Loading />
		)
	}
	if (!data && error) {
		return (
			<Custom404Page message="Can't found any Courses data" />
		)
	}
	const {challenges} = data
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/challenges' isActive>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<List>
				{challenges.map((challenge) => (
						<ListItem key={challenge["challenge_id"]} context={challenge}/>
				))}
			</List>

		</RootLayout>
	)
}

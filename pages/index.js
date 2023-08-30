import NavigationItem from "../components/NavigationItem"
import Navigation from "../components/Navigation"
import Dashboard from "../components/Dashboard"
import DashboardItem from "../components/DashboardItem"
import RootLayout from "../components/RootLayout"
import FetchApi from "../lib/FetchApi"
import Link from "next/link"
import useSWR from "swr";
import Loading from "../components/Loading";
import Custom404Page from "../components/Custom404Page";
import {useState} from "react";
import fetchApi from "../lib/FetchApi";
import loginAuth from "../utils/loginAuth";

const Home = ({ isAuthenticated }) => {
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
	console.log(dataToken)
	if (!dataToken && errorToken) {
		return (
			<Custom404Page message="Dashboard data not found" />
		)
	}
	const {data, error, isLoading} = useSWR(() => (dataToken?.accessToken ? dataToken?.accessToken : ''), FetchApi.getDashboard)
	if (loadingToken || !isAuthenticated || isLoading) {
		return (
			<Loading />
		)
	}

	if (!data && error) {
		return (
			<Custom404Page message="Dashboard data not found" />
		)
	}
	const {challenges_total, courses_total} = data
	return (
		<RootLayout>
			<Navigation>
				<NavigationItem href='/' isActive>Dashboard</NavigationItem>
				<NavigationItem href='/courses'>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<Dashboard>
				<DashboardItem>
					<Link href='/challenges' className="hover:shadow-md group rounded-md p-3 shadow-sm text-center">
						<dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
							<div>
								<dt className="sr-only">Title</dt>
								<dd className="group-hover:text-blue-700 font-semibold text-slate-900">
                                Challenges
								</dd>
							</div>
							<div>
								<dt className="sr-only">Info</dt>
								<dd className="group-hover:text-blue-700">{challenges_total} challenges are live</dd>
							</div>
						</dl>
					</Link>
				</DashboardItem>
				<DashboardItem>
					<Link href='/courses' className="hover:shadow-md group rounded-md p-3 shadow-sm text-center">
						<dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
							<div>
								<dt className="sr-only">Title</dt>
								<dd className="group-hover:text-blue-700 font-semibold text-slate-900">
                                Courses
								</dd>
							</div>
							<div>
								<dt className="sr-only">Info</dt>
								<dd className="group-hover:text-blue-700">{courses_total} courses are live</dd>
							</div>
						</dl>
					</Link>
				</DashboardItem>
			</Dashboard>
		</RootLayout>
	)
}

export default loginAuth(Home)

import NavigationItem from "../components/NavigationItem"
import Navigation from "../components/Navigation"
import Dashboard from "../components/Dashboard"
import DashboardItem from "../components/DashboardItem"
import RootLayout from "../components/RootLayout"
import FetchApi from "../lib/FetchApi"
import Link from "next/link"

export async function getStaticProps() {
	const dashboardData = await FetchApi.getDashboard()
	return {
		props: {
			dashboardData
		}
	}
}
export default function Home({ dashboardData }) {
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
								<dd className="group-hover:text-blue-700">{dashboardData.challenges_total} challenges are live</dd>
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
								<dd className="group-hover:text-blue-700">{dashboardData.courses_total} courses are live</dd>
							</div>
						</dl>
					</Link>
				</DashboardItem>
			</Dashboard>
		</RootLayout>
	)
}

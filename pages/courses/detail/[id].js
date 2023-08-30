import fetchApi from "../../../lib/FetchApi"
import {useRouter} from "next/router"
import Navigation from "../../../components/Navigation"
import NavigationItem from "../../../components/NavigationItem"
import RootLayout from "../../../components/RootLayout"
import DetailCourse from "../../../components/DetailCourse"
import useSWR from "swr"
import Loading from "../../../components/Loading"
import Custom404Page from "../../../components/Custom404Page"
import {useState} from "react";
import loginAuth from "../../../utils/loginAuth";

const Detail = (isAuthenticated) => {
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
    const router = useRouter()
    const {id} = router.query
    const request = {
        token: dataToken?.accessToken,
        id
    }
	const { data, error, isLoading } = useSWR(request, fetchApi.getCoursesById)
	if (!data && error) {
		return (
			<Custom404Page message="Cannot get course data. ID not found" />
		)
	}
	if (isLoading || !isAuthenticated || loadingToken) {
		return (
			<Loading />
		)
	}
	return(
		<RootLayout>
			<Navigation>
				<NavigationItem href='/'>Dashboard</NavigationItem>
				<NavigationItem href='/courses' isActive>Courses</NavigationItem>
				<NavigationItem href='/courses/form'>Add New Course</NavigationItem>
				<NavigationItem href='/challenges'>Challenges</NavigationItem>
				<NavigationItem href='/challenges/form'>Add New Challenge</NavigationItem>
			</Navigation>
			<DetailCourse className="mr-2" courseData={data?.course}></DetailCourse>
		</RootLayout>
	)
}

export default loginAuth(Detail)
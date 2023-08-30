import fetchApi from "../lib/FetchApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useRouter} from "next/router";
const MySwal = withReactContent(Swal)

export default function Navigation({children}) {
	const router = useRouter()
	const handleLogout = async () => {
		await fetchApi.userLogout()
			.then(() => {
				void router.replace('/login')
			})
			.catch((e) => {
				MySwal.fire({
					title: `Username or Password not valid: ${e}`,
					icon: 'error'
				})
			})
	}
	return (
		<nav className='py-4 px-6 text-sm font-medium'>
			<ul className='flex space-x-3'>
				{children}
				<a href="#" className={`block px-3 py-2 rounded-md bg-red-500 text-black`} onClick={handleLogout}>
					Logout
				</a>
			</ul>
		</nav>
	)
}

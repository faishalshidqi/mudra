import Date from "./Date"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import fetchApi from "../lib/FetchApi"
import {useRouter} from "next/router"
const MySwal = withReactContent(Swal)

export default function DetailChallenge({ challengeData: {challenge_id: id, created_at, description, title, course_title, type, answer, updated_at} }) {
	const router = useRouter()

	const handleRedirect = (e) => {
		e.preventDefault()

		void router.push(`/challenges/detail/${id}/form`)
	}
	const handleDelete = () => {
		return MySwal.fire({
			confirmButtonText: "Yes",
			showDenyButton: true,
			focusDeny: true,
			denyButtonText: "No",
			icon: "question",
			title: "Delete Challenge?",
			text: "This challenge will be delete permanently"
		}).then(async (result) => {
			if (result.isConfirmed) {
				const {accessToken} = await fetchApi.getAccessToken()
				await fetchApi.deleteChallenge(id,accessToken)
					.then(() => {
						return MySwal.fire({
							title: "Success",
							text: "Berhasil Menghapus challenge",
							icon: "success"
						}).then(() => {
							window.location.href = "/challenges"
						})
					})
					.catch((e) => {
						return MySwal.fire({
							title: "Error",
							text: `Gagal Menghapus Challenge: ${e}`,
							icon: "error"
						})
					})
			}
		})
	}
	return (
		<div className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7">Challenge Detail</h3>
				<div className="mt-5 flex lg:ml-4 lg:mt-0 py-2">
					<span className="sm:block">
						<button type="button"
							className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-50"
							onClick={handleRedirect}>
							<svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
								aria-hidden="true">
								<path
									d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"/>
							</svg>
                        Edit
						</button>
					</span>
					<span className="sm:ml-3">
						<button type="button"
							className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={handleDelete}>
                        Delete
						</button>
					</span>
				</div>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Challenge Title</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{title}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Course Title</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{course_title}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Challenge Type</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{type}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Created At</dt>
						<Date className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0" dateString={created_at}></Date>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Updated At</dt>
						<Date className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0" dateString={updated_at}></Date>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Challenge Description</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
							{description}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Challenge Answer</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
							{answer}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	)
}

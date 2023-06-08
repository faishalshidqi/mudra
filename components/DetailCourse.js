import Link from "next/link"
import Date from "./Date"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import fetchApi from "../lib/FetchApi"
import {useRouter} from "next/router"
const MySwal = withReactContent(Swal)

export default function DetailCourse({ courseData: {course_id: id, created_at, description, sign_pict_link, title, type, updated_at} }) {
	const router = useRouter()

	const handleRedirect = (e) => {
		e.preventDefault()

		void router.push(`/courses/detail/${id}/form`)
	}
	const handleDelete = () => {
		return MySwal.fire({
			confirmButtonText: "Yes",
			showDenyButton: true,
			focusDeny: true,
			denyButtonText: "No",
			icon: "question",
			title: "Delete Course?",
			text: "This course will be delete permanently"
		}).then(async (result) => {
			if (result.isConfirmed) {
				await fetchApi.deleteCourse(id)
					.then(() => {
						return MySwal.fire({
							title: "Success",
							text: "Berhasil Menghapus course",
							icon: "success"
						}).then(() => {
							window.location.href = "/courses"
						})
					})
					.catch((e) => {
						return MySwal.fire({
							title: "Error",
							text: `Gagal Menghapus Course: ${e}`,
							icon: "error"
						})
					})
			}
		})
	}
	return (
		<div className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7">Course Detail</h3>
				<div className="mt-5 flex lg:ml-4 lg:mt-0 py-2">
					<span className="sm:block">
						<button type="button"
							className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-auto"
							onClick={handleRedirect}
						>
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
							onClick={handleDelete}

						>
                        Delete
						</button>
					</span>
				</div>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Course Title</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{title}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Course Type</dt>
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
						<dt className="text-sm font-medium leading-6">Course Description</dt>
						<dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
							{description}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6">Attachments</dt>
						<dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
							<ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
								<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
									<div className="flex w-0 flex-1 items-center">
										<div className="ml-4 flex min-w-0 flex-1 gap-2">
											<span className="truncate font-medium">Course Image Url</span>
										</div>
									</div>
									<div className="ml-4 flex-shrink-0">
										<Link href={sign_pict_link} className="font-medium text-indigo-600 hover:text-indigo-500">
                                            See Image
										</Link>
									</div>
								</li>
							</ul>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	)
}

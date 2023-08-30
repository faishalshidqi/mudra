import {useState} from "react"
import FetchApi from "../lib/FetchApi"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {useRouter} from "next/router"
import fetchApi from "../lib/FetchApi"

const MySwal = withReactContent(Swal)

export default function ChallengeForm({ challengeData, courses }) {
	const router = useRouter()
	if(router.isFallback) {
		return (
			<div
				className="m-56 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status">
				<span
					className=" !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
				</span>
			</div>
		)
	}
	const isActive = () => {
		return challengeData?.is_deleted ? "0" : "1"
	}
	const setDataFromProps = () => {
		return {
			title: challengeData?.title,
			description: challengeData?.description,
			type: challengeData?.type,
			answer: challengeData?.answer
		}
	}
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [data, setData] = useState(setDataFromProps() ?? {
		title: "",
		description: "",
		type: "Select course first!",
		answer: ""
	})
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [selectedRadioOption, setSelectedRadioOption] = useState( isActive ?? "1")
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [selectedOption, setSelectedOption] = useState(challengeData?.course_id ?? "Default")
	const handleChange = (e) => {
		const value = e.target.value
		setData({
			...data,
			[e.target.name]: value
		})
	}

	const handleRadioValueChange = (e) => {
		const radioValue = e.target.value
		setSelectedRadioOption(radioValue)
	}

	const handleCourseValueChange = (e) => {
		const optionValue = e.target.value
		setSelectedOption(optionValue)
		const selectedCourse = courses.find((course) => course.course_id === optionValue)
		setData({
			...data,
			type: selectedCourse.type
		})
	}


	const handleSubmit = async (e) => {
		e.preventDefault()
		const {accessToken} = await fetchApi.getAccessToken()
		const request = {
			body: {
				title: data.title,
				description: data.description,
				type: data.type,
				course_id: selectedOption,
				answer: data.answer,
				is_deleted: !(Number(selectedRadioOption)),
			}
		}
		if (challengeData) {
			await fetchApi.editChallengeById(challengeData["challenge_id"], request, accessToken)
				.then(() => {
					return MySwal.fire({
						title: "Success",
						text: "Berhasil memperbarui challenge!",
						icon: "success"
					}).then(() => {
						router.back()
					})
				})
				.catch((e) => {
					return MySwal.fire({
						title: "Error",
						text: `Gagal memperbarui challenge: ${e}`,
						icon: "error"
					})
				})
			return
		}
		await FetchApi.addNewChallenge(request, accessToken)
			.then(({challenge_id}) => {
				return MySwal.fire({
					title: "Success",
					text: `Berhasil menambahkan challenge. challenge id: ${challenge_id}`,
					icon: "success"
				}).then(() => {
					window.location.href = "/challenges"
				})
			})
			.catch((e) => {
				return MySwal.fire({
					title: "Error",
					text: `Gagal menambahkan Challenge: ${e}`,
					icon: "error"
				})
			})
	}
	const handleClickButton = (e) => {
		e.preventDefault()
		if (window.history.length > 1) {
			router.back()
		} else {
			void router.push("/challenges")
		}
	}
	return (
		<form onSubmit={handleSubmit} className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
			<div className="space-y-12 space-x-5">
				<div className="border-b border-white-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7">Add new challenge</h2>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="title" className="block text-sm font-medium leading-6">
                                Title
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="title"
									id="title"
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.title}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="sm:col-span-full">
							<label htmlFor="courseId"
								className="block text-sm font-medium leading-6">Course Name</label>
							<div className="mt-2">
								<select id="courseId"
									name="courseId"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
									onChange={handleCourseValueChange}
									value={selectedOption}
								>
									<option value='Default' disabled>Choose Course</option>
									{
										courses.map(({course_id, title, type}) => (
											<option key={course_id} value={course_id}>{title} - {type}</option>
										))
									}
								</select>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="description" className="block text-sm font-medium leading-6">
                                Description
							</label>
							<div className="mt-2">
								<textarea
									name="description"
									id="description"
									className="block w-96 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.description}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="sm:col-span-full">
							<label htmlFor="type"
								className="block text-sm font-medium leading-6">Course Type</label>
							<div className="mt-2">
								<input
									type="text"
									name="type"
									id="type"
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.type}
									readOnly
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="answer" className="block text-sm font-medium leading-6">
								{/* eslint-disable-next-line react/no-unescaped-entities */}
                                Challenge's Answer
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="answer"
									id="answer"
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.answer}
									onChange={handleChange}
									maxLength='1'
								/>
							</div>
						</div>
						<fieldset>
							<legend className="text-sm font-semibold leading-6">Is this challenge active?
							</legend>
							<div className="mt-6 space-y-6">
								<div className="flex items-center gap-x-3">
									<input
										id="active"
										name="isActive"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
										value={"1"}
										checked={selectedRadioOption === "1"}
										onChange={handleRadioValueChange}
									/>
									<label htmlFor="active"
										className="block text-sm font-medium leading-6">Yes</label>
								</div>
								<div className="flex items-center gap-x-3">
									<input
										id="notActive"
										name="isActive"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
										value='0'
										checked={selectedRadioOption === "0"}
										onChange={handleRadioValueChange}
									/>
									<label htmlFor="notActive"
										className="block text-sm font-medium leading-6">No</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-start gap-x-6">
				<button
					type="button"
					className="text-sm rounded-md py-2 px-3 bg-red-600 font-semibold leading-6 text-white"
					onClick={handleClickButton}
				>
                    Cancel
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
                    Submit
				</button>
			</div>
		</form>
	)
}

import {useState} from "react"
import SendRequest from "../lib/SendRequest"

export default function AddCourseForm() {
	const [data, setData] = useState({
		title: "",
		pictUrl: "",
		description: "",
		isActive: "",
	})
	const [selectedOption, setSelectedOption] = useState("1")

	const handleChange = (e) => {
		const value = e.target.value
		setData({
			...data,
			[e.target.name]: value
		})
	}

	const handleOptionChange = (e) => {
		const optionValue = e.target.value
		setSelectedOption(optionValue)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const courseData = {
			title: data.title,
			pictUrl: data.pictUrl,
			description: data.description,
			isActive: !!Number(selectedOption),
		}

		SendRequest.addNewCourse(courseData)
	}
	return (
		<form onSubmit={handleSubmit} className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
			<div className="space-y-12 space-x-5">
				<div className="border-b border-white-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-white">Add new course</h2>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
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
						<div className="sm:col-span-4">
							<label htmlFor="pictUrl" className="block text-sm font-medium leading-6 text-white">
                                Sign Picture
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="pictUrl"
									id="pictUrl"
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={data.pictUrl}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
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
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-white">Is this course active?
							</legend>
							<div className="mt-6 space-y-6">
								<div className="flex items-center gap-x-3">
									<input
										id="active"
										name="isActive"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
										value='1'
										checked={selectedOption === "1"}
										onChange={handleOptionChange}
									/>
									<label htmlFor="active"
										className="block text-sm font-medium leading-6 text-white">Yes</label>
								</div>
								<div className="flex items-center gap-x-3">
									<input
										id="notActive"
										name="isActive"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
										value='0'
										checked={selectedOption === "0"}
										onChange={handleOptionChange}
									/>
									<label htmlFor="notActive"
										className="block text-sm font-medium leading-6 text-white">No</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-start gap-x-6">
				<button type="button" className="text-sm rounded-md py-2 px-3 bg-red-600 font-semibold leading-6 text-white">
                    Cancel
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
                    Save
				</button>
			</div>
		</form>
	)
}

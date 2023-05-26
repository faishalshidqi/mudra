import Link from "next/link";
import Date from "./Date";

export default function DetailCourse({ courseData: {createdAt, description, imageUrl, title, type, updatedAt} }) {
    return (
        <div className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-white">Course Detail</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Course Title</dt>
                        <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">{title}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Course Type</dt>
                        <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">{type}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Created At</dt>
                        <Date className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0" dateString={createdAt}></Date>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Updated At</dt>
                        <Date className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0" dateString={updatedAt}></Date>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Course Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                            {description}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Attachments</dt>
                        <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium">Course Image Url</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <Link href={imageUrl} className="font-medium text-indigo-600 hover:text-indigo-500">
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
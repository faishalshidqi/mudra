import Link from "next/link"
import Date from "./Date"
import Image from "next/image"

export default function ListItem({context: {challenge_id, course_id, updated_at, type, sign_pict_link, title, course_title}}) {
	const renderCourseLink = () => {
		return (
			<Link href={`/courses/detail/${course_id}`}> {course_title} </Link>
		)
	}

	return (
		<article className="flex items-start space-x-6 p-6">
			<Image src={sign_pict_link ? sign_pict_link : '/mudra-logo-round-short.png'} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
			<div className="min-w-0 relative flex-auto">
				<h2 className="font-semibold truncate pr-20">
					<Link href={challenge_id ? `/challenges/detail/${challenge_id}` : `/courses/detail/${course_id}`}> {title} </Link>
				</h2>
				<dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
					<div className="ml-2">
						<dt className="sr-only">Last Update</dt>
						<dd><Date dateString={updated_at}></Date></dd>
					</div>

					<div>
						<dt className="sr-only">Type</dt>
						<dd className="flex items-center">
							<svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
								<circle cx="1" cy="1" r="1" />
							</svg>
							{course_title ? renderCourseLink(course_title) : type}
						</dd>
					</div>
				</dl>
			</div>
		</article>
	)
}

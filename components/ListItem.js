import { parseISO, format} from 'date-fns'

export default function ListItem({context}) {
    const date = parseISO("2023-03-05");
    return (
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
                             src={context.sign_pict_link}
                             alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-white">{context.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-white">{context.description}</p>
                            </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-white">
                            {context.type}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white">Created at
                            <time dateTime={context.created_at || date}> {format(date, 'LLLL d, yyyy')}</time>
                        </p>
                    </div>
                </li>

    )
}

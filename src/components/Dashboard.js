export default function Dashboard({children}) {
    return (
        <div className='grid grid-flow-row grid-rows-1 grid-cols-2 gap-4'>
            {children}
        </div>
    )
}

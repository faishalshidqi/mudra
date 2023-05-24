export default function NavigationItem({href, isActive, children}) {
    return (
        <li>
            <a href={href} className={`block px-3 py-2 rounded-md ${isActive ? 'bg-blue-950 text-white' : 'bg-slate-50 text-black'}`}>
                {children}
            </a>
        </li>
    );
}

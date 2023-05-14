import NavigationItem from "@/components/NavigationItem";
require('dotenv').config()
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";


export default async function Home() {
    const fetched = (await fetch(`${process.env.API_URL}/kll/dashboard`)).json()
    return (
    <div className='divide-y divide-slate-100'>
      <Navigation>
          <NavigationItem href='/' isActive>Dashboard</NavigationItem>
          <NavigationItem href='/courses'>Courses</NavigationItem>
          <NavigationItem href='/challenges'>Challenges</NavigationItem>
      </Navigation>
        <Dashboard>
            <div>
                <p>100 challenges are live</p>
            </div>
            <div>
                <p>100 courses are live</p>
            </div>

        </Dashboard>
    </div>
  )
}

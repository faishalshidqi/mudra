import NavigationItem from "@/components/NavigationItem";
require('dotenv').config()
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import DashboardItem from "@/components/DashboardItem";
import Layout from "@/components/Layout";
import FetchApi from "@/data/FetchApi";


export default async function Home() {
    const fetched = await FetchApi.getDashboard()
    return (
    <Layout>
      <Navigation>
          <NavigationItem href='/' isActive>Dashboard</NavigationItem>
          <NavigationItem href='/courses'>Courses</NavigationItem>
          <NavigationItem href='/challenges'>Challenges</NavigationItem>
      </Navigation>
        <Dashboard>
            <DashboardItem>
                <p>{fetched.info[0].challenges_total} challenges are live</p>
            </DashboardItem>
            <DashboardItem>
                <p>{fetched.info[0].courses_total} courses are live</p>
            </DashboardItem>
        </Dashboard>
    </Layout>
  )
}

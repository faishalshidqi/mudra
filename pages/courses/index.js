import Layout from "@/components/Layout";
import ListItem from "@/components/ListItem";
import List from "@/components/List";
import NavigationItem from "@/components/NavigationItem";
import Navigation from "@/components/Navigation";
import '../../src/app/globals.css'

export default function CoursesList() {
    return (
        <Layout>
            <Navigation>
                <NavigationItem href='/'>Dashboard</NavigationItem>
                <NavigationItem href='/courses' isActive>Courses</NavigationItem>
                <NavigationItem href='/challenges'>Challenges</NavigationItem>
            </Navigation>
            <List>
                <ListItem key='asaasasas' context='asasa'/>
                <ListItem key='123' context='123'/>
            </List>
        </Layout>
    )
}

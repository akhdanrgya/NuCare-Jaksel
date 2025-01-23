import Profile from "@/components/dashboard/Profile"
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

const ProfilePage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Profile" />
            <Profile />
        </DefaultLayout>
    )
}
export default ProfilePage
//import AppNav from "../components/AppNav"
import Sidebar from "../components/SideBar"
import styles from './AppLayout.module.css'
//import User from "./User"
import Map from "./Map"
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />   
      <Map />   
      {/* <User /> */}
    </div>
  )
}

export default AppLayout


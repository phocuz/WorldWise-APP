//import AppNav from "../components/AppNav"
import Sidebar from "../components/SideBar"
import styles from './AppLayout.module.css'
import Map from "./Map"
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />   
      <Map />   
    </div>
  )
}

export default AppLayout


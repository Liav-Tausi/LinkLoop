import { useContext } from "react"
import { AppContext } from "../../../App/AppStates/AppReducer"


const ProfilePic = () => {
  const { accessToken } = useContext(AppContext)
  

  return (
    <img src={} alt="profile picture">
    </img>


  )
}
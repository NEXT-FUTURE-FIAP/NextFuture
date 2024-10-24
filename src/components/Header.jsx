// Links para NAV
import {Link} from "react-router-dom"
// CSS
import { NavMenu } from "../styleComponents"
// imagens
import Logo from "../assets/logo.png"
import iconUser from "../assets/iconUser.png"

export default function Header(){
    const getUsuario = localStorage.getItem("usuario")

    return(
        <>
            <NavMenu>
                <img className="logo" src={Logo} alt="" />
                <div className="menu">
                        <Link to='/'>HOME</Link>
                        <Link to='/corridas'>CORRIDAS</Link>
                        {/* {getUsuario ? (
                            <Link to='/palpite'>PRIXPREDICT</Link>
                        ):(
                            <Link to='/login'>PRIXPREDICT</Link>
                        )} */}
                        {/* {getUsuario ? (
                            <Link to='/forum'>forum</Link>
                        ):(
                            <Link to='/login'>forum</Link>
                        )} */}
                        <Link to='/palpite'>PRIXPREDICT</Link>                        

                        <Link to="/login"><img className="icon" src={iconUser} alt="" /></Link>
                        <Link to='/forum'>forum</Link>                        

                </div>
            </NavMenu>
        </>
    )
}
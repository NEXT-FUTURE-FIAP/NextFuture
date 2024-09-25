// Links para NAV
import {Link} from "react-router-dom"
// CSS
import { NavMenu } from "../styleComponents"
// imagens
import Logo from "../assets/logo.png"

export default function Header(){

    return(
        <>
            <NavMenu>
                <img src={Logo} alt="" />
                <div className="menu">
                        <Link to='/'>HOME</Link>
                        <Link to='/corridas'>CORRIDAS</Link>
                        <Link to='/palpite'>PRIXPREDICT</Link>
                </div>
            </NavMenu>
        </>
    )
}
import {Link} from "react-router-dom"
import { NavMenu } from "../styleComponents"

export default function Header(){

    return(
        <>
            <NavMenu>
                <div className="menu">
                    <Link to='/'>HOME</Link>
                    <Link to='/corridas'>CORRIDAS</Link>
                    <Link to='/palpite'>PRIXPREDICT</Link>
                </div>
            </NavMenu>
        </>
    )
}
import {Link} from "react-router-dom"
import { NavMenu } from "../styleComponents"
import Logo from "../assets/logo.png"
import iconUser from "../assets/iconUser.png"

const menu_content = [
    // { path: '', value: 'HOME' },
    { path: 'game', value: 'GAME' },
    { path: 'corridas', value: 'CORRIDAS' },
    { path: 'palpite', value: 'PRIXPREDICT' },
    { path: 'login', value: <img className="icon" src={iconUser} alt="" /> }
];


export default function Header(){
    const getUsuario = localStorage.getItem("usuario")

    return(
        <>
            <NavMenu>
                <Link to='/'><img className="logo" src={Logo} alt="" /></Link>
                <div className="menu">
                    {menu_content.map(({path,value},index)=>{
                        return(
                            <Link key={index} to={`/${path}`}>{value}</Link>
                        );
                    })}
                </div>
            </NavMenu>
        </>
    )
}
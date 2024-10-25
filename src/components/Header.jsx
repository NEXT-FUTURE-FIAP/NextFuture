import {Link} from "react-router-dom"
import { NavMenu } from "../styleComponents"
import Logo from "../assets/logo.png"
import iconUser from "../assets/iconUser.png"

const menu_content = [
    { path: 'game', value: <h2>GAME</h2> },
    { path: 'corridas', value: <h2>CORRIDAS</h2> },
    { path: 'palpite', value:<h2>PRIXPREDICT</h2> },
    { path: 'login', value: <img className="icon" src={iconUser} alt="" /> }
];


export default function Header(){
    const getUsuario = localStorage.getItem("usuario")

    return(
        <>
            <NavMenu>
                <Link to='/' style={{padding:'2rem'}}><img className="logo" src={Logo} alt="" /></Link>
                <div className="menu" style={{display:'flex'}}>
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
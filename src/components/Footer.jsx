// CSS
import { FootFooter } from "../styleComponents"
// imagens
import LogoFiap from "../assets/fiap.png"
import LogoMahindra from "../assets/LogoMahindra2.png"
import LogoParceiro from "../assets/parceiro.png"
import imgFooter from "../assets/imgFooter.png"
import IconInsta from "../assets/instagram.png"
import IconGit from "../assets/github.png"

export default function Footer(){
    return(
        <>
            <FootFooter>
                <img className="background" src={imgFooter} alt="" />
                <h1 className="txtFoot">PARCEIROS</h1>
                <div className="footer">
                    <div className="logosFooter">
                        <div className="linha"></div>
                        <a href="https://www.grandepremio.com.br/#:~:text=Explore%20no%20Grande%20Pr%C3%AAmio%20as%20not%C3%ADcias%20mais%20recentes%20e" target="blank"><img src={LogoParceiro} alt="grande prêmio" /></a>
                        <a href="https://www.mahindraracing.com/" target="blank"><img className="mahindra" src={LogoMahindra} alt="mahindra" /></a>
                        <a href="https://www.fiap.com.br/" target="blank"><img src={LogoFiap} alt="fiap" /></a>
                    </div>
                    <div className="contato">
                        <a href="#">
                            SOBRE NÓS
                        </a>
                        <a href="#">
                            FALE CONOSCO
                        </a>
                    </div>
                    </div>
                    <hr />
                    <div className="base">
                        <div className="icons">
                            <a href="https://www.instagram.com/nxtftres?igsh=MWEzcXFxdHFkNHhvMA==" target="blank"><img src={IconInsta} alt="" /></a>
                            <a href="https://github.com/NEXT-FUTURE-FIAP" target=""><img src={IconGit} alt="" /></a>
                        </div>
                        <p>@Site apenas para fins acadêmicos</p>
                    </div>
            </FootFooter>
           
        </>
    )
}
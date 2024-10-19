import { useRef, useState, useEffect} from "react"
import {useNavigate, Link} from 'react-router-dom'
import { SecLogin } from './styleLogon'

const Login =()=>{
    localStorage.removeItem('gameStarted') 

    //Hook-useRef pega a referencia de um componente ou elemento do DOM
    const usuario = useRef();
    const senha = useRef();

    //Hook-useState - Manipula o estado da variavel
    const [usuarios, setUsuarios]=useState([])

    //Hook -useNavigate- ele redireciona para outro componente
    const navigate = useNavigate();

    //criando a função de validação

    function validar(){
        for( let  i=0; i <usuarios.length;i++){
            if(
                usuarios[i].usuario == usuario.current.value &&
                usuarios[i].senha ==senha.current.value
            )
            return true
        }
    }
    

    //criado a função handleSubmit
    const handleSubmit=(e)=>{
        //previne que sua pagina faça qualquer modificação ex. load
        e.preventDefault();
        if(validar()){
            //criando a autenticação
            let token=
                Math.random().toString(16).substring(2)+
                Math.random().toString(16).substring(2)
                localStorage.setItem("usuario",usuario.current.value);
                localStorage.setItem("senha", token);
                navigate("/")
                
        } else{
            alert("usuario/senha inválidos")
        }
    }

    //Hook-useEffect vai buscar os dados do login no json

    useEffect(()=>{
        //pega o link da url
        fetch("http://localhost:5000/usuarios")
        //promise
        .then((res)=>{
            //converte os dados para json
            return res.json();
        })
        .then((res)=>{
            //recebe as alterações da variavel
            setUsuarios(res)
        })
        //retrona um array vazio
    },[])

    return(
        <SecLogin>
            <section className="container">
                <div className="container-login">
                <div className="login">

                    <form className="login-form" onSubmit={handleSubmit}>
                        <span className="titulo-login">FAÇA SEU LOGIN</span>

                        <div className="w-input">
                                <input
                                    type="text"
                                    className="input-form"
                                    id="usuario"
                                    ref={usuario}                 
                                />
                                <span placeholder="usuario">user</span>
                        </div>


                        <div className="w-input">
                                <input
                                    type="password"
                                    className="input-form"
                                    id="senha"
                                    ref={senha}                 
                                />
                                <span placeholder="senha">password</span>
                        </div>

                        <div className="login-btn">
                            <button type="submit" className="login-form-btn">Login</button>

                        </div>

                        {/*uteis */}

                        <ul className="uteis">
                            <li>
                                <span className="texto1">Esqueceu sua senha?</span>
                            </li>
                            <li>
                                <span className="texto1">Não possui Conta?</span>
                            <Link to="/cadastro">
                                Criar
                            </Link>
                            <Link to="/logingoogle">
                                Login com Google
                            </Link>
                            </li>

                        </ul>

                    </form>
                </div>
                </div>
            </section>
        </SecLogin>
        
    )
}
export default Login
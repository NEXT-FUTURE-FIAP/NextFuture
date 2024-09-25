import styled from "styled-components";

export const NavMenu = styled.nav`
    width: 100%;
    background-color: #180f57;
    min-height: 10vh;
    display: flex;
    align-self: center;
    justify-content: space-between;
    align-content: center;
    
    img{
        height: 60px;
    }

    .menu{
        margin-top: 2%;
    }

    a{
        font-family: "Rajdhani", sans-serif;
        text-decoration: none;
        color: #F4F4F4;
        font-size: 15px;
        font-weight: 500;
        margin-right: 30px;
    }

    a:hover{
        color: #DC00FE;
    }

    /* breakpoint tablet */
    @media (max-width: 850px) {
        img{
            height: 80px;
            margin: 10px;
        }
        .menu{
            margin-top: 5%;
        }
        a{
            font-size: medium;
            margin-right: 35px;
        }
    }
    /* breakpoint celular */
    @media (max-width: 480px) {
        img{
            height: 40px;
            margin: 10px;
        }
        .menu{
            margin-top: 6%;
        }

        a{
            font-size: 12px;
            font-weight: 500;
            margin-right: 20px;
        }
    }
`

export const FootFooter = styled.footer`
    width: 100%;
    background-color: #180f57;
    margin-top: 15%;

    .footer{
        display: flex;
        justify-content: space-between;
    }

    .background{
        height: 21vh;
    }
    .linha{
        height: 150px;
        width: 5px;
        background-color: white;
    }

    .txtFoot{
        font-family: "Rajdhani", sans-serif;
        color: #F4F4F4;
        margin-top: 5%;
        margin-left: 4%;
    }

    .logosFooter{
        display: flex;
        width: 30%;
        align-items: center;
        margin-left: 4%;
        margin-bottom: 8%;
       
    }
    .logosFooter img{
        margin-top: 4%;
        width: 100px;
        margin-left: 5%;
        margin-bottom: 4%;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .logosFooter img:hover{
        transform: translateY(-10px);
    }
    
    .contato{
        display: flex;
        flex-direction: column;
        margin-right: 10%;
        margin-top: 2%;
        width: 20%;
    }

    .contato a{
        text-decoration: none;
        color: #F4F4F4;
        font-family: "Rajdhani", sans-serif;
        font-size: 20px;
        margin-bottom: 8%;
        transition: transform 0.3s ease;
    }

    .contato a:hover{
        color: #DC00FE;
        transform: translateX(10px);
    }

    hr{
        color: #8929a2;
        margin-bottom: 1%;
    }

    .base{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1%;
    }

    .base img{
        width: 30px;
        margin-left: 15px;
        cursor: pointer;
    }

    .icons{
        display: flex;
        margin-left: 1%;
    }

    p{
        color: #00C0F9;
        font-family: "Rajdhani", sans-serif;
        margin-right: 3%;
        font-weight: 600;
    }

    /* breakpoint tablet */
    @media (max-width: 850px){
        .background{
            height: 8vh;
        }
        .linha{
            height: 90px;
            width: 3px;
        }
        .txtFoot{
            font-size: x-large;
            margin-bottom: 2%;
        }
        .logosFooter img{
            width: 80px;
        }

    }
    /* breakpoint celular */
    @media (max-width: 480px) {
        .background{
             height: 6vh;
        }
        .linha{
            height: 50px;
            width: 2px;
        }
        .txtFoot{
            font-size: medium;
        }
        .logosFooter{
            margin-top: 1%;
            width: 40%;
        }
        .logosFooter img{
            width: 50px;
        }
        .contato a{
            font-size: 10px;
            margin-bottom: 8%;
        }
        .base img{
            width: 25px;
            margin-top: 1%;
        }
        p{
            font-size: x-small;
            margin-top: 2%;
        }
    }
    
`
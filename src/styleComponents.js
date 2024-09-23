import styled from "styled-components";

export const NavMenu = styled.nav`
    width: 100%;
    background-color: #180f57;
    min-height: 10vh;
    display: flex;
    align-self: center;
    justify-content: end;
    align-content: center;
    
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
`

export const FootFooter = styled.footer`

    width: 100%;
    background-color: #180f57;

`

import styled from "styled-components";

export const MainHome = styled.main`
    
    display: flex;
    flex-direction: column;
    font-family: "Rajdhani", sans-serif;

    .car{
        display: flex;
        color: #00C0F9;
        font-weight: 300;
        font-size: 35px;
    }

    .txt_car{
        width: 30%;
        margin-top: 10%;
        margin-left: 15%;
    }

    .btn_sign{
        width: 150px;
        height: 40px;
        font-family: "Rajdhani", sans-serif;
        font-weight: bold;
        color: white;
        margin-top: 15px;
        background-color: #00C0F9;
        border-style: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
    }
    .btn_sign:hover{
        cursor: pointer;
        background-color: #8929a2;
    }

    .btn_sign p{
        margin-top: 7%;
    }
    .btn_sign svg{
        margin-top: 5%;
    }

    .raceInfo{
        display: flex;
        justify-content:space-between;
    }

    .titulo{
        color: #00C0F9;
        margin-left: 3%;
        margin-bottom: 1%;
    }
    
    .podio{
        display: flex;
        width: 45%;
    }

    .podioList{
        flex-direction: column;
    }


    .line{
        height: 300px;
        width: 5px;
        background-color: #00C0F9;
        margin-left: 8%;
        margin-right: 1%;
    }

    .first{
        width: 350px;
        height: 80px;
        background-color: #312c9f;
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .first:hover{
        cursor: pointer;
        transform: translateX(-10px);
    }

    .second{
        width: 350px;
        height: 80px;
        background-color: #312c9f;
        margin-top: 8%;
        margin-bottom: 8%;
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .second:hover{
        cursor: pointer;
        transform: translateX(-10px);
    }

    .third{
        width: 350px;
        height: 80px;
        background-color: #312c9f;
        transition: transform 0.3s ease, background-color 0.3s ease;
        
    }

    .third:hover{
        cursor: pointer;
        transform: translateX(-10px);
    }

    .calendar{
        display: flex;
        margin-right: 5%;
    }

    .circuito_img{
        width: 400px;
    }

    .date{
        background-color: #66187a;
        height: 225px;
        border-radius: 0px 10px 10px 0px;
        padding: 10px;
        color: white;
    }

    .date button{
        margin-top: 48%;
        margin-left: 40%;
        font-family: "Rajdhani", sans-serif;
        border-radius: 5px;
        border-style: none;
        height: 10%;
        width: 60%;
        cursor: pointer;
        background-color: #00C0F9;
        color: white;
        font-weight: bold;
    }
`
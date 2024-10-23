import styled from "styled-components";
import React, { useState } from "react";
import UserImg from "../assets/user.png";
import TV from "../assets/tv.png";


const StyleProfile = styled.section`
  .pCard_card {
    font-family: "Rajdhani", sans-serif;
    width: 30%;
    height: 615px;
    margin: 50px auto;
    border-radius: 30px;
    background-color: #f6fcfe;
    box-shadow: 0px 20px 70px rgba(0, 0, 0, 0.21);
    position: relative;
    overflow: hidden;
    transition: 0.5s ease-in-out;
  }

  .pCard_back {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -139px;
    font-weight: 600;
    z-index: 1;
  }

  .pCard_back a {
    text-decoration: none;
  }

  .pCard_up {
    position: absolute;
    width: 100%;
    height: 437px;
    background-position: 50%;
    background-size: cover;
    z-index: 3;
    text-align: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    transition: 0.5s ease-in-out;
  }

  .pCard_on .pCard_up {
    height: 100px;
    box-shadow: 0 0 30px #cfd8dc;
  }

  .pCard_text {
    position: absolute;
    top: 319px;
    left: 0;
    right: 0;
    color: #f1f7f9;
    transition: 0.5s ease-in-out;
  }

  .pCard_on .pCard_text {
    top: 20px;
  }

  .pCard_text h2 {
    margin: 0;
    font-size: 25px;
    font-weight: 600;
  }

  .pCard_text p {
    margin: 0;
    font-size: 16px;
    color: #e3f1f5;
  }

  .pCard_add {
    border-radius: 50%;
    background-color: #00C0F9;
    box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.43);
    position: absolute;
    top: 392px; /* ajuste conforme necessário */
    left: 0;
    right: 0;
    margin: auto;
    width: 88px;
    height: 88px;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    display: flex; /* Para usar flexbox */
    align-items: center; /* Centraliza verticalmente */
    justify-content: center; /* Centraliza horizontalmente */
}

.pCard_add i {
    color: #ffffff; /* Define a cor do ícone como branco */
    font-size: 24px; /* Aumenta o tamanho do ícone */
    margin: 0; /* Remove margem se houver */
    padding: 0; /* Remove padding se houver */
}

  .pCard_on .pCard_add {
    transform: rotate(360deg) scale(0.5);
    top: 470px;
  }

  .pCard_down {
    background-color: #6225E6;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 178px;
    z-index: 2;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    transition: 0.5s ease-in-out;
    display: flex; /* Ativa o flexbox */
    justify-content: space-between; /* Adiciona espaço entre os itens */
    padding: 20px; /* Adiciona um pouco de padding se necessário */
}

.pCard_down div {
    display: flex; /* Para centralizar o conteúdo dentro de cada div */
    align-items: center; /* Alinha verticalmente os itens */
    text-align: center; /* Centraliza o texto */
    font-size: 18px;
    transition: 0.5s ease-in-out;
}

.pCard_down div p:first-of-type {
    color: #ffffff;
    margin-bottom: 5px;
}

.pCard_down div p:last-of-type {
    color: #ffffff;
    font-weight: 700;
    margin-top: 0;
}
  img.pointsIcon {
      width: 27px;
      height: 27px;
      margin-top: 10%;
      margin-right: 2%;
    }

    .detail{
        display: flex;
        flex-direction: column;
        margin-top: 15%;
    }

    .tv{
        width: 30px;
    }
    @media (max-width: 500px) {
    .pCard_card {
        width: 80%;

    }


    }

`;

export default function UserCard() {
  const [isCardOn, setIsCardOn] = useState(false);

  const toggleCard = () => {
    setIsCardOn(!isCardOn);
  };

  return (
    <StyleProfile>
      <div
            className={`pCard_card ${isCardOn ? "pCard_on" : ""}`}
            onClick={toggleCard}
        >
            <div className="pCard_up" style={{ backgroundImage: `url(${UserImg})` }}>
                <div className="pCard_text">
                    <h2>User Name</h2>
                    <p>RACE LOVER</p>
                </div>
                <div className="pCard_add" onClick={toggleCard}>
                    <i className={`fas ${isCardOn ? "fa-minus" : "fa-plus"}`}></i>
                </div>
            </div>
            <div className="pCard_down">
                <div className="detail">
                    <img src="pontos.png" alt="Icone Pontos" className="pointsIcon" />
                    <p>2.000</p>
                </div>
                <div className="detail">
                    <img  className="tv" src={TV} alt="" />
                    <p>5 hrs</p>
                </div>
            </div>
            <div className="pCard_back">
                <p>See My Latest Work Here</p>
                <p>Follow Me!</p>
            </div>
        </div>
    </StyleProfile>
  );
}

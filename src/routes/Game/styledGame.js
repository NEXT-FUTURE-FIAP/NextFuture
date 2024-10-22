import styled from "styled-components";

export const MainGame = styled.main`

.bannerimg{
    width: 100%;
}

.game-container {
    margin-top: 100px;
    position: relative;
    text-align: center;
}

.game {
  position: relative; /* O contêiner .game controla a posição do canvas e do botão */
}

.game-canvas {

    width: 95vw; /* Ocupa toda a largura da viewport */
    height: auto; /* Mantém a proporção da altura */
    max-height: 95vh; /* Limite de altura baseado na viewport */
    display: block;
    margin: 0 auto; /* Centralizar */
  }
  

  .button {
    position: absolute; /* Posiciona o botão relativo ao contêiner pai (.game) */
  top: 65%; /* Altere essa porcentagem para mudar a posição vertical do botão */
  left: 50%; /* Centraliza horizontalmente */
  transform: translateX(-50%); /* Garante que o botão fique completamente centralizado horizontalmente */
  padding: 20px 40px;
  width: max-content;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}


.button a{
  color:white;
  font-family: "Rajdhani", sans-serif;
  font-weight:bold;
  font-style: italic;
  font-size:36px;
  text-align: center;
  text-decoration:none;
  background-color:#DC00FE;
  display:block;
  position:relative;
  padding:20px 40px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  filter: dropshadow(color=#000, offx=0px, offy=1px);
  -webkit-box-shadow:inset 0 1px 0 #5f106b, 0 10px 0 #5f106b;
  -moz-box-shadow:inset 0 1px 0 #5f106b, 0 10px 0 #5f106b;
  box-shadow:inset 0 1px 0 #5f106b, 0 10px 0#5f106b;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer; /* Indica que é clicável */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  filter: dropshadow(color=#000, offx=0px, offy=1px);
  -webkit-box-shadow:inset 0 1px 0#5f106b, 0 10px 0 #5f106b;
  -moz-box-shadow:inset 0 1px 0 #5f106b, 0 10px 0 #5f106b;
  box-shadow:inset 0 0 0 #5f106b, 0 8px 0 #5f106b;
  -webkit-border-radius: 5px;
  -moz-border-radius: 10px;
  border-radius: 5px;

}

.button a:active{
  top:10px;
  background-color:#DC00FE;
  -webkit-box-shadow:inset 0 1px 0 #5f106b, inset 0 -3px 0 #5f106b;
  -moz-box-shadow:inset 0 1px 0 #5f106b, inset 0 -3px 0 #5f106b;
  box-shadow:inset 0 1px 0 #5f106b, inset 0 -3px 0 #5f106b;
  text-shadow: 0px 0px 2px #e3e0e4;
  box-shadow: 0 0 10px #e3e0e4, 0 0 20px #e3e0e4, 0 0 40px #e3e0e4;
}

.button:after{
  content:"";
  height:100%;
  width:100%;
  padding:4px;
  position: absolute;
  bottom:-15px;
  left:-4px;
  z-index:-1;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.points-container {
    position: absolute;
    top: 6%;
    left: 7%;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    color: #000;
    display: flex;
    align-items: center;
    color: white;
    font-family: "Rajdhani", sans-serif;
    font-weight: bold;

    img.pointsIcon {
      width: 27px;
      height: 27px;
      margin-top: 10%;
      margin-right: 2%;
    }
  }

.pointsIcon:hover {
    transform: rotate(20deg); 
    overflow: hidden;
}

.upgrade-button {
    background: linear-gradient(145deg, #07e4a2, #0967e0); 
    border: none;
    border-radius: 10px; 
    color: white; 
    cursor: pointer; 
    font-size: 1.5rem; 
    font-weight: bold; 
    padding: 15px 30px; 
    margin: 15px; 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5), 
                inset 0 0 5px rgba(255, 255, 255, 0.3); 
    transition: all 0.3s ease; 
}

.upgrade-button:hover {
    background: linear-gradient(145deg, #210252, #476ed8); 
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 
    inset 0 0 15px rgba(255, 255, 255, 0.4);
    transform: translateY(-4px); 
}

.upgrade-button:active {
    box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.5),
    inset -5px -5px 5px rgba(255, 255, 255, 0.2);
    transform: translateY(2px); 
}

.wrapper {
  display: flex;
  justify-content: center;
}
svg { 
  max-width: 100%;  
}

.cta {
    display: flex;
    margin: 2%;
    position: absolute;
    top: 30%;
    padding: 10px 45px;
    text-decoration: none;
    font-family: "Rajdhani", sans-serif;
    font-size: 40px;
    color: white;
    background: #6225E6;
    transition: 1s;
    box-shadow: 6px 6px 0 black;
    transform: skewX(-15deg);
}

.cta:focus {
   outline: none; 
}

.cta:hover {
    transition: 0.5s;
    box-shadow: 10px 10px 0 #00C0F9;
}

.cta span:nth-child(2) {
    transition: 0.5s;
    margin-right: 0px;
}

.cta:hover  span:nth-child(2) {
    transition: 0.5s;
    margin-right: 30px;
}


  span:nth-child(2) {
    width: 40px;
    margin-left: 30px;
    position: relative;
    top: 12%;
  }
  

path.one {
    transition: 0.4s;
    transform: translateX(-60%);
}

path.two {
    transition: 0.5s;
    transform: translateX(-30%);
}


.cta:hover path.one {
    transform: translateX(0%);
}

.cta:hover path.two {
    transform: translateX(0%);
}

@media (max-width: 500px) {

    .game-canvas {
    width: 100%;      /* Ajusta para 100% da largura da tela */
    height: auto;     /* Altura automática para manter a proporção */
  }

  .button {
    position: absolute; /* Posiciona o botão relativo ao contêiner pai (.game) */
  top: 50%; /* Altere essa porcentagem para mudar a posição vertical do botão */
}
  
    .button a {
      font-size: 24px; 
      padding: 10px 25px; 
    }
  
    .button:after {
      bottom: -10px; 
      left: -2px;
    }
  
}



`
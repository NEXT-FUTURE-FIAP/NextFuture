import styled from "styled-components";

export const MainGame = styled.main`

.bannerimg{
    width: 100%;
}

.game-container {
    margin-top: 300px;
    position: relative;
    text-align: center;
}

.game-canvas {
    width: 90vw;  /* 90% da largura da viewport */
    height: 80vh; /* 40% da altura da viewport */
    border: 1px solid #000; /* Para visualizar os limites */
    display: block;
    margin: 0 auto; /* Centralizar */
  }
  

.controls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    text-align: center;
    width: 30%;
    background-color: transparent;
    border-radius: 10px;
    padding: 10px;

}

.points-container {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center; 
    font-size: 24px; 
    color: white; 
    margin-bottom: 20px; 
    transition: transform 0.2s; 
    overflow: hidden; 
}

.points-container:hover {
    transform: scale(1.05);
     
}

.pointsIcon {
    width: 50px; 
    height: 50px; 
    margin-left: 10px; 
    transition: transform 0.2s; 
    overflow: hidden;
    margin: 5%;
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



`
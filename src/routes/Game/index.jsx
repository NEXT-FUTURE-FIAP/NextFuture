import React, { useEffect, useState } from 'react';
import './Game.css'; // Para estilos se necessário
import BannerGame from "../../assets/background_game.png"

const Game = () => {
  

  useEffect(() => {
    // Carregar o script do jogo
    const script = document.createElement('script');
    script.src = 'script.js'; // Caminho relativo para o script na mesma pasta
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      
      <div id="game-container">
        <canvas id="game-canvas" width="1486" height="849"></canvas>
        <div id="controls">
          <div id="points-container">
            <p>
              Pontos: <span id="points">0</span>
              <img src="pontos.png" alt="Icone Pontos" id="pointsIcon" />
            </p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('motor', 'motorPrice')}>
              <p>Melhorar motor = <span id="motor">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('battery', 'batteryPrice')}>
              <p>Melhorar battery = <span id="battery">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('recharge', 'rechargePrice')}>
              <p>Melhorar recharge = <span id="recharge">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('efficiency', 'efficiencyPrice')}>
              <p>Melhorar efficiency = <span id="efficiency">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('track', 'trackPrice')}>
              <p>Melhorar track = <span id="track">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('timeOff', 'timeOffPrice')}>
              <p>Melhorar timeOff = <span id="timeOff">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('powerUpgrade', 'powerUpgradePrice')}>
              <p>Melhorar powerUpgrade = <span id="powerUpgrade">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('powerTeUpgrade', 'powerTeUpgradePrice')}>
              <p>Melhorar powerTeUpgrade = <span id="powerTeUpgrade">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => upgrade('powerReUpgrade', 'powerReUpgradePrice')}>
              <p>Melhorar powerReUpgrade = <span id="powerReUpgrade">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.power()}>
            <p>Turbo</p>
          </div>
          <div id="upgrade-button" onClick={() => window.mudarSkin()}>
            <p id = "mudarSkin">Mudar aparência</p>
          </div>
          <div id="upgrade-button" onClick={() => window.money()}>
            <p id = "money">muito ponto </p>
          </div>
          <div id="upgrade-button" onClick={() => window.stat0()}>
            <p id = "money">rest </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;

// gameScript.js


if (typeof window.gameInitialized === "undefined") {
    window.gameInitialized = true; // Marca o jogo como inicializado


    const pointsElement = document.getElementById('points');
    

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    const trackImg = new Image();
    trackImg.src = 'pista.png';  // Caminho da imagem da pista

    const carImages = [
        'carro.png',
        'carro2.png',
        'carro3.png'
    ];

    let currentCarImageIndex = 0;

    // Ajuste as coordenadas dos pontos do caminho (path) para porcentagens
    const path = [
        { x: 0.99, y: 0.89 },  // Ponto inicial (parte de baixo à direita)
        { x: 0.013, y: 0.89 },  // Mover-se para a esquerda na parte inferior
        { x: 0.013, y: 0.001 }, // Subir pelo lado esquerdo
        { x: 0.955, y: 0.001 },  // Mover-se para a direita na parte superior
        { x: 0.955, y: 0.89 },   // Descer pelo lado direito
    ];

    let car = {
        x: canvas.width * 0.54,
        y: canvas.height * 0.89,
        width: 50,
        height: 100,
        speed: 10,
        points: 2000,
        laps: 0,
        motorPreco: 10,
        bateriaPreco: 20,
        battery: 2.5,
        maxbattery: 2.5,
        direction: 3 // Começa voltado para baixo
    };

    let pause = false;
    let recharge = 5000;
    let currentTargetIndex = 1;
    function drawCar() {
        const carImg = new Image();
        carImg.src = carImages[currentCarImageIndex]; // Carrega a imagem do carro
        ctx.save();
        ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
        ctx.rotate(car.direction * Math.PI / 2);
        ctx.drawImage(carImg, -car.width / 2, -car.height / 2, car.width, car.height);
        ctx.restore();
    }
    window.point ={
        points: car.points
    }


    function drawTrack() {
        ctx.drawImage(trackImg, 0, 0, canvas.width, canvas.height);
    }
    
    
    function pos(){
        // Coordenadas do ponto alvo atual, ajustadas para a largura e altura do canvas
        const target = {
            x: path[currentTargetIndex].x * canvas.width,
            y: path[currentTargetIndex].y * canvas.height,
        };
        
        // Cálculo da direção do movimento
        const dx = target.x - car.x;
        const dy = target.y - car.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        return [target, dx, dy, distance]
    }
    
    function move(){
        let [target, dx, dy, distance] = pos()
        if (distance < car.speed) {
            car.x = target.x;
            car.y = target.y;
            currentTargetIndex++;
            if (currentTargetIndex >= path.length) {
                currentTargetIndex = 1; // Reinicia o caminho (ignora o ponto inicial)
            }
    
            // Atualiza a direção do carro baseado no movimento
            const nextTarget = {
                x: path[currentTargetIndex].x * canvas.width,
                y: path[currentTargetIndex].y * canvas.height,
            };
            if (nextTarget.y < car.y) {
                car.direction = 0; // Up
            } else if (nextTarget.x > car.x) {
                car.direction = 1; // Right
            } else if (nextTarget.y > car.y) {
                car.direction = 2; // Down
            } else if (nextTarget.x < car.x) {
                car.direction = 3; // Left
            }
        } else {
            car.x += (dx / distance) * car.speed;
            car.y += (dy / distance) * car.speed;
        }
    
        // Usar uma margem de erro ao comparar posições (10 pixels de margem)
        if (Math.abs(car.x - canvas.width * 0.54) < 10 && Math.abs(car.y - canvas.height * 0.9) < 10 ) {
            car.points+=0.5
            car.battery-=0.5
            pointsElement.innerText = car.points.toFixed(2);
            if (car.battery== 0){
                pitStop()
            }
        }
        lastX = car.x;
    
    
    }

    function pitStop() {
        pause = true;
        setTimeout(() => {
            car.battery = car.maxbattery;
            pause = false;  // Despausa o carro
        }, recharge);
    }

    function motorUpgrade() {
        if (car.points >= car.motorPreco) {
            car.points -= car.motorPreco;
            car.speed += 1;
            car.motorPreco *= 1.15;
            document.getElementById('motor').innerText = car.motorPreco.toFixed(2);
            document.getElementById('points').innerText = car.points.toFixed(2);
        }
    }

    function bateiraUpgrade() {
        if (car.points >= car.bateriaPreco) {
            car.points -= car.bateriaPreco;
            car.battery += 1;
            car.maxbattery = car.battery;
            car.bateriaPreco *= 1.20;
            document.getElementById('bateria').innerText = car.bateriaPreco.toFixed(2);
            document.getElementById('points').innerText = car.points.toFixed(2);
        }
    }

    function recargaUpgrade() {
        const posto = { recargaPreco: 200 };
        if (car.points >= posto.recargaPreco) {
            car.points -= posto.recargaPreco;
            recharge *= 0.95;
            posto.recargaPreco *= 1.15;
            document.getElementById('recarga').innerText = posto.recargaPreco.toFixed(2);
            document.getElementById('points').innerText = car.points.toFixed(2);
        }
    }

    function mudarSkin() {
        currentCarImageIndex = (currentCarImageIndex + 1) % carImages.length;
    }

    // Função principal para atualizar o jogo
    function updateGame() {
        if (!pause) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTrack();
            move();
        }
        drawCar();
        requestAnimationFrame(updateGame);
    }

    // Iniciar o jogo quando a imagem da pista estiver carregada
    trackImg.onload = () => {
        updateGame();
    };
}
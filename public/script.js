if (typeof window.gameInitialized === "undefined") {
    window.gameInitialized = true; // Marca o jogo como inicializado

    const usuarioAtual = localStorage.getItem("usuario");
    const pointsElement = document.getElementById('points');
    console.log(pointsElement)
    const canvas = document.getElementById('game-canvas-id');
    const ctx = canvas.getContext('2d');



    const trackImges = [
        'track1.png',
        'track2.png',
        'track3.png',
    ]

    const carImages = [
        'carro.png',
        'carro2.png',
        'carro3.png'
    ];

    // Ajuste as coordenadas dos pontos do caminho (path) para porcentagens
    const path0 = [
        { x: 0.54, y: 0.87 },
        { x: 0.54, y: 0.87 },  // Ponto inicial (parte de baixo à direita)
        { x: 0.013, y: 0.87 },  // Mover-se para a esquerda na parte inferior
        { x: 0.013, y: -0.025 }, // Subir pelo lado esquerdo
        { x: 0.955, y: -0.025 },  // Mover-se para a direita na parte superior
        { x: 0.955, y: 0.87 },   // Descer pelo lado direito
    ];
    const path1 = [
        { x: 0.54, y: 0.87 },  // Ponto inicial (parte inferior)
        { x: 0.015, y: 0.87 }, // Mover-se para a esquerda na parte inferior
        { x: 0.015, y: -0.025 },  // Subir (primeiro movimento para cima)
        { x: 0.329, y: -0.025 },   // Mover-se para a direita
        { x: 0.329, y: 0.529 },  // Descer um pouco
        { x: 0.635, y: 0.529 },   // Mover-se para a direita novamente
        { x: 0.635, y: -0.025 },    // Subir mais
        { x: 0.955, y: -0.025 },  // Mover-se para a direita na parte superior
        { x: 0.955, y: 0.87 }, // Descer até o ponto final
    ];
    
    const path2 = [
        { x: 0.54, y: 0.87 },  // Ponto inicial (parte inferior)
        { x: 0.013, y: 0.87 },  // Mover-se para a esquerda na parte inferior
        { x: 0.013, y: -0.025 },   // Subir na parte esquerda
        { x: 0.15, y: -0.025 },    // Mover-se para a direita no topo da segunda curva
        { x: 0.15, y: 0.53 },    // Descer de volta no meio
        { x: 0.35, y: 0.53 },    // Descer de volta no meio
        { x: 0.35, y: -0.025 },    // Descer de volta no meio
        { x: 0.55, y: -0.025 },    // Descer de volta no meio
        { x: 0.55, y: 0.53 },   // Mover-se para a direita
        { x: 0.755, y: 0.53 },   // Mover-se para a direita
        { x: 0.755, y: -0.025 },   // Subir novamente
        { x: 0.955, y: -0.025 },   // Mover-se para a direita no topo
        { x: 0.955, y: 0.87 },  // Descer até o ponto final
    ];
    

    const paths = [
        path0,
        path1,
        path2
    ]
    
    let currentPath = path0
    let currentTrackImageIndex = 0;
    let currentCarImageIndex = 0;
    let car = {
        x: canvas.width *currentPath[0].x,
        y: canvas.height*currentPath[0].y,
        width: 50,
        height: 100,
        speed: 10,
        points: 1000000000, // Inicializado para 0
        laps: 0,
        battery: 1.5,
        efficiency: 1,
        maxbattery: 2.5,
        powerOn:false,
        power:1.1,
        rechargingPower:false,
        direction: 3 // Começa voltado para baixo
    };
    let up_price = {
        motorPrice: 10,
        efficiencyPrice: 20,
        batteryPrice: 20,
        rechargePrice: 200,
        timeOffPrice: 200,
        trackPrice: 1000,
        powerUpgradePrice:5000,
        powerReUpgradePrice:4000,
        powerTeUpgradePrice:3000
    };

    window.up = {
        battery: 0,
        efficiency: 0,
        motor: 0,
        powerUpgrade: 0,
        recharge: 0,
        timeOff: 0,
        track: 0,
        powerReUpgrade: 0,
        powerTeUpgrade: 0
    };

    let track = {
        track:1,
        timeOff:24

    }

    if (typeof window.lastSavedPoints === "undefined") {
        window.lastSavedPoints = 0;  // Inicializa com 0 se ainda não foi definido
    }

    if (typeof window.lastSavedUpgrades === "undefined") {
        window.lastSavedUpgrades = JSON.stringify({
            battery: 0,
            efficiency: 0,
            motor: 0,
            power: 0,
            recharge: 0,
            timeOff: 0,
            track: 0,
        }); // Inicializa com o estado inicial dos upgrades
    }

    let gameRunning = false;
    let pause = false;
    let recharge = 5000;
    let powerRecharge = 25000
    let powerTime = 5000
    let currentTargetIndex = 1;
    const trackImg = new Image();
    trackImg.src = trackImges[currentTrackImageIndex]
    function drawCar() {
        const carImg = new Image();
        carImg.src = carImages[currentCarImageIndex]; // Carrega a imagem do carro

        // Proporção do carro em relação ao canvas
        const carWidth = canvas.width * 0.035;  // 10% da largura do canvas
        const carHeight = canvas.height * 0.15;  // 5% da altura do canvas

        ctx.save();
        // // Atualiza a posição do carro baseado na nova largura/altura
        // const carX = car.x * canvas.width; // posição x proporcional ao canvas
        // const carY = car.y * canvas.height; // posição y proporcional ao canvas
        
        ctx.translate(car.x + carWidth / 2, car.y + carHeight / 2);
        ctx.rotate(car.direction * Math.PI / 2);
        ctx.drawImage(carImg, -carWidth / 2, -carHeight / 2, carWidth, carHeight);
        ctx.restore();
    }

    function formatNumber(value) {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + 'B';  // Bilhões
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + 'M';  // Milhões
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + 'K';  // Milhares
        } else {
            return value.toFixed(2);  // Mantém o número como está
        }
    }
    

    // Função para carregar o usuário do JSON
    function loadUserData() {
        return fetch('/dados.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                const usuario = data.usuarios.find(user => user.usuario === usuarioAtual);
                
                if (usuario.upgrades) {
                    // Carregar pontos e upgrades
                    car.points = usuario.points || 0;


                    const lastLogoutTime = new Date(localStorage.getItem('lastLogoutTime'));
                    const currentTime = new Date();
                    const timeElapsed = (currentTime - lastLogoutTime) / 1000; // em segundos
    
                    // Calcule pontos offline e adicione aos pontos atuais
                    const offlinePoints = calculateOfflinePoints(timeElapsed);
                    // car.points += offlinePoints;
                    console.log(`Tempo offline: ${timeElapsed} segundos.`);
                    console.log(`Pontos ganhos enquanto estava offline: ${formatNumber(offlinePoints)}`);
                    points= document.getElementById("points")
                    points.innerHTML = formatNumber(car.points);


                    try{
                        const upgradeKeys = Object.keys(usuario.upgrades); // Pega as chaves de usuario.upgrades

                    // Atualizar valores de window.up
                        upgradeKeys.forEach(key => {
                            window.up[key] = usuario.upgrades[key] || 0;
                        });
                        
                        // Ajustar os preços dos upgrades com base nos valores já comprados
                        upgradeKeys.forEach(key => {
                            
                            const priceKey = `${key}Price`; // Gera o nome da chave de preço correspondente
                            if (up_price[priceKey]) {
                                up_price[priceKey] *= Math.pow(1.20,window.up[key] );
                                console.log("foi chamado",up_price[priceKey])
                                
                                // Verifica se o elemento com o ID existe antes de tentar acessar innerText
                                const element = document.getElementById(`${key}`);
                                if (element) {
                                    element.innerText = formatNumber(up_price[priceKey]);
                                } else {
                                    console.warn(`Elemento com o ID ${key} não encontrado`);
                                }
                            }
                        });
                        
                    upgradeKeys.forEach(upgradeKey => {
                        for (let i = 0; i < window.up[upgradeKey]; i++) {
                            upgradeEffect(upgradeKey); // Aplica o efeito acumulado para cada nível de upgrade
                        }
                    });} catch(error){
                        console.error(error);
                    }
    
    
                    pointsElement.innerText = formatNumber(car.points); // Atualiza o elemento HTML com os pontos
    
                    console.log('Dados carregados:', usuario);
                } else {
                    console.error('Usuário não encontrado, iniciando com valores padrão.');
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar dados do usuário:', error);
                
            });
    }
    // Função para salvar dados do usuário no JSON
    function saveUserData() {
        // Primeiro, buscar o usuário atual no servidor
        // console.log(usuarioAtual)
        fetch(`http://localhost:5000/usuarios?usuario=${usuarioAtual}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Se o usuário existir, atualize os dados
                    const usuario = data[0];  // Como o servidor retorna uma array, o primeiro item é o usuário encontrado
    
                    // Atualizar os dados de pontos e upgrades
                    usuario.points = car.points;
                    usuario.upgrades = window.up;
                    usuario.logoutTime = new Date().toISOString();
                     // Captura a data e hora atual
                    localStorage.setItem('lastLogoutTime', usuario.logoutTime);


    
                    // Fazer a requisição PUT para atualizar o usuário no servidor
                    fetch(`http://localhost:5000/usuarios/${usuario.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usuario)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao salvar dados do usuário');
                        }
                        return response.json();
                    })
                    // .then(updatedUser => {
                    //     console.log('Dados do usuário atualizados com sucesso:', updatedUser);
                    // })
                    .catch(error => {
                        console.error('Erro ao salvar dados do usuário:', error);
                    });

    
                } else {
                    // Se o usuário não existir, criar um novo usuário
                    const newUser = {
                        usuario: usuarioAtual,
                        points: car.points,
                        logoutTime:logoutTime,
                        upgrades: window.up
                    };
    
                    // Fazer a requisição POST para criar o novo usuário
                    fetch('http://localhost:5000/usuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao criar novo usuário');
                        }
                        return response.json();
                    })
                    .then(createdUser => {
                        console.log('Novo usuário criado com sucesso:', createdUser);
                    })
                    .catch(error => {
                        console.error('Erro ao criar novo usuário:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
             // Salva no localStorage

        
            // Se você tiver um backend, você pode enviar essa informação:
            
        }
        
    function pos() {
        const target = {
            x: currentPath[currentTargetIndex].x * canvas.width,
            y: currentPath[currentTargetIndex].y * canvas.height,
        };

        const dx = (target.x - car.x)*0.54;
        const dy = (target.y - car.y)*0.87;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return [target, dx, dy, distance];
    }

    function calculateOfflinePoints(timeElapsed) {
        // Define os valores de pontuação por nível de pista
        const pointsPerLap = {
            1: 1,
            2: 2,
            3: 4
        };
    
        // Consumo de bateria por volta baseado na eficiência
        const batteryConsumptionPerLap = 1 / car.efficiency;
        // console.log("batteryConsumptionPerLap =", batteryConsumptionPerLap)
    
        // Calcula quantas voltas são possíveis com uma carga completa
        const lapsPerCharge = car.maxbattery / batteryConsumptionPerLap;
        // console.log("lapsPerCharge =", lapsPerCharge)

        let [target, dx, dy, distance] = pos();

        // Tempo necessário para completar uma volta (em segundos)
        // console.log(totalDistance)
        const timePerLap = (distance/10)  / car.speed; // Ajuste de tempo baseado na largura e velocidade
        // console.log("timePerLap =", timePerLap)
        // Tempo total para esgotar a bateria (em segundos)
        const timeToDeplete = lapsPerCharge * timePerLap;
        // console.log("timeToDeplete =", timeToDeplete)
        // Tempo total de uma corrida até uma recarga completa (em segundos)
        const totalCycleTime = timeToDeplete + (recharge / 1000);
        // console.log("totalCycleTime =", totalCycleTime)
        // Pontos ganhos por ciclo completo
        const pointsPerCycle = lapsPerCharge * pointsPerLap[track.track];
        // console.log("pointsPerCycle =", pointsPerCycle)
        // Pontos por segundo
        const pointsPerSecond = pointsPerCycle / totalCycleTime;
        // console.log("pointsPerSecond =", pointsPerSecond)
        // Calcula quantos pontos seriam ganhos durante o tempo offline
        const pointsEarnedOffline = pointsPerSecond * timeElapsed;
        // console.log("pointsEarnedOffline =", pointsEarnedOffline)
        return pointsEarnedOffline;
    }
    
    function adjustCanvasResolution() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
    
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
    
        context.scale(dpr, dpr);
    }

    function drawTrack() {
        ctx.drawImage(trackImg, 0, 0, canvas.width, canvas.height);
    }

    function getZoomFactor() {
        return canvas.width / canvas.width; // Ajuste conforme a implementação
    }
    function move() {
        let [target, dx, dy, distance] = pos();
        // Normaliza a velocidade com base na largura do canvas
        const normalizedSpeed = car.speed * (canvas.width / 1250);
    
        if (distance < normalizedSpeed) {
            car.x = target.x;
            car.y = target.y;
            currentTargetIndex++;
            if (currentTargetIndex >= currentPath.length) {
                currentTargetIndex = 1; // Reinicia o caminho (ignora o ponto inicial)
            }
    
            const nextTarget = {
                x: currentPath[currentTargetIndex].x * canvas.width,
                y: currentPath[currentTargetIndex].y * canvas.height,
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
            car.x += (dx / distance) * normalizedSpeed;
            car.y += (dy / distance) * normalizedSpeed;
        }
    
        // Ampliar a área de detecção para garantir que os pontos sejam contabilizados
        const detectionRadius = car.speed; // Define uma área ao redor do ponto de verificação
        if (Math.abs(car.x - canvas.width * 0.54) < detectionRadius && 
            Math.abs(car.y - canvas.height * 0.87) < detectionRadius) {
            if (track.track == 1)    
                car.points += 0.5;
                car.battery -= 0.5;
                pointsElement.innerText = formatNumber(car.points);
                if (car.battery <= 0) {
                    pitStop();
                }
            if (track.track == 2) {
                car.points += 1;
                car.battery -= 0.5;
                pointsElement.innerText = formatNumber(car.points);
                if (car.battery <= 0) {
                    pitStop();
                }
            }
            if (track.track == 3) {
                car.points += 2;
                car.battery -= 0.5;
                pointsElement.innerText = formatNumber(car.points);
                if (car.battery <= 0) {
                    pitStop();
                }
            }    
        }
    }

    function pitStop() {
        pause = true;
        setTimeout(() => {
            car.battery = car.maxbattery * car.efficiency;
            pause = false;  // Despausa o carro
        }, recharge);
    }
    function turbo() {
        // console.log(car.powerOn)
        // console.log(car.rechargingPower)
        if (!car.powerOn && !car.rechargingPower) {  // Impede ativar o turbo se já estiver ligado
            car.powerOn = true;
            car.rechargingPower = true
            console.log(car.speed)
    
            // Armazena a velocidade original do carro
            const originalSpeed = car.speed;
    
            // Aumenta a velocidade do carro instantaneamente
            car.speed = car.speed * car.power;
    
            // Restaura a velocidade original após o tempo definido
            setTimeout(() => {
                car.speed = originalSpeed;  // Restaura a velocidade original
                car.powerOn = false;  // Desativa o turbo
                console.log("Turbo desativado. Velocidade restaurada:", car.speed);

                setTimeout(() => {
                    car.rechargingPower = false;  // Recarga concluída, turbo pode ser usado novamente
                    console.log("Turbo recarregado e pronto para uso.");
                }, powerRecharge); 
            }, powerTime);
        }
    }

    function upgrade(stat, priceKey) {
        const price = up_price[priceKey];

        if (car.points >= price) {
            car.points -= price; // Deduz os pontos
            window.up[stat] += 1; // Incrementa o nível do upgrade
            up_price[priceKey] *= 1.20; // Aumenta o preço para o próximo upgrade
            document.getElementById(stat).innerText = formatNumber(up_price[priceKey]);
            document.getElementById('points').innerText = formatNumber(car.points);
            
            upgradeEffect(stat); // Aplica o efeito específico do upgrade
            saveUserData(); // Salva os dados atualizados
        }
    }


    // Função upgradeEffect (permanecendo a mesma)
    function upgradeEffect(upgradeKey) {
        switch (upgradeKey) {
            case 'motor':
                car.speed += 4;
                break;
            case 'battery':
                car.battery += 1;
                car.maxbattery = car.battery;
                break;
            case 'efficiency':
                car.efficiency *= Math.pow(1.2, window.up.efficiency);
                break;
            case 'recharge':
                recharge *= 0.95;
                break;
            case 'track':
                track.track += 1;
                up_price.trackPrice *= 1.6667;
                document.getElementById("track").innerText = formatNumber(up_price.trackPrice);
                break;
            case 'timeOff':
                track.timeOff += 1;
                break;
            case 'powerUpgrade':
                car.power *= 1.1;
                break;
            case 'powerTeUpgrade':
                powerTime *= 1.1;
                break;
            case 'powerReUpgrade':
                powerRecharge *= 0.975;
                break;
            default:
                console.log(`Upgrade não reconhecido: ${upgradeKey}`);
        }
    }

    function changeSkin() {
        currentCarImageIndex = (currentCarImageIndex + 1) % carImages.length;
    }
    function changeTrack() {
        // Mudar para a próxima imagem de pista
        currentTrackImageIndex = (currentTrackImageIndex + 1) % trackImges.length;
        trackImg.src = trackImges[currentTrackImageIndex];
        currentPath = paths[currentTrackImageIndex]
    
        // Reiniciar o jogo
        currentTargetIndex = 1; // Reiniciar o índice do caminho
        car.x = canvas.width * 0.54; // Posição inicial do carro
        car.y = canvas.height * 0.87;
        car.direction = 3; // Direção inicial do carro (virado para baixo)
        car.battery = car.maxbattery; // Reiniciar a bateria para o máximo

        // Opcional: redefinir a pontuação, voltas ou outros estados, se necessário
         // Redefinir pontos, se desejado
        car.laps = 0; // Reiniciar o contador de voltas
        pointsElement.innerText = formatNumber(car.points);

    }
    function power() {
        turbo()
    }
    function money(){
        car.points +=10000000
    }
    function stat0(){
        window.up = window.up*0
        car.points =0
        track.track = 0
    }
    // Função principal para atualizar o jogo
    let saveTimer;
    let saveInterval = 100; 
    function updateGame() {
        console.log(up_price.powerReUpgradePrice)
        // console.log(powerTime)
        // console.log(powerRecharge)
        if (!pause) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTrack();
            move();
        }
        if (car.points !== window.lastSavedPoints || JSON.stringify(window.up) !== window.lastSavedUpgrades) {
            window.lastSavedPoints = car.points;  // Atualiza os últimos pontos salvos
            window.lastSavedUpgrades = JSON.stringify(window.up);  // Atualiza os últimos upgrades salvos

            // Se já houver um timer ativo, limpa-o antes de criar um novo
            if (saveTimer) {
                clearTimeout(saveTimer);
            }

            // Define um novo timer para salvar os dados após o intervalo
            saveTimer = setTimeout(() => {
                saveUserData();
            }, saveInterval);
        }
        drawCar()

        requestAnimationFrame(updateGame);
    }

    // Iniciar o jogo quando a imagem da pista estiver carregada
    trackImg.onload = () => {
        if (!gameRunning) {
            gameRunning = true;
            loadUserData();
            updateGame(); // Garante que o jogo seja atualizado apenas uma vez
        }
    };

    // Adicionando os event listeners para os botões de upgrade

    // Salvar os dados automaticamente antes de sair da página
    window.addEventListener('beforeunload', () => {
        saveUserData()
    });
    window.addEventListener('resize', adjustCanvasResolution);
    adjustCanvasResolution();
}
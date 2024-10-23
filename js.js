var direction = 1;
var iPonto;
var nivel;
var bStop = false;
var tabela;
var peca;
var peca_atual;
var perdeu = false;
var centro_peca;
var rotaciona_peca = 0;
var grid;
var loop;
var play = 0;
var pontos;
var tocouchao;
var tocoupecas;
function iniciar() {
  play++;
  iPonto = 0;
  nivel = 1;
  pontos = document.getElementById("tbpontos");
  let ponto = document.createElement("tr");
  let num = document.createElement("td");
  let numponto = document.createElement("td");
  ponto.appendChild(num);
  num.innerHTML = play;
  ponto.appendChild(numponto);
  pontos.appendChild(ponto);
  document.getElementById("iniciar").disabled = true;
  grid = document.getElementById("grid");
  for(var i = 0; i < 250; i++){
    let celula = document.createElement("div");
    grid.appendChild(celula);
  }
  // Inicializa os componentes do jogo
  tabela = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  // Inicia o loop do jogo
  loop = 
  setInterval(function() {
    //SEMPRE SETA PARA PEÇA IR PRA BAIXO
    direction = 0;
    var criaNovaPeca = true;
    tabela.forEach((linha)=>{
      linha.forEach((element) => {
        if(element == 2){
          criaNovaPeca = false;
          return;
        }
      });
      if(!criaNovaPeca){
        return;
      }
    });
    if(criaNovaPeca){
      centro_peca = [2,4];
      rotaciona_peca = 0;
      var peca = criaPeca(centro_peca, tabela);
    }
    // Atualiza a posição da tabela
    atualizarTabela();
    if(tocoupecas || tocouchao){
      solidificaPeca();
    }
    marcaPonto();

    desenhar();
  }, 500);
}

function solidificaPeca(){
  peca.forEach((pixel)=>{
    tabela[pixel[0]][pixel[1]] = 1;
  });
  for(var i = 0; i < 25; i++){      
    for(var j = 0; j < 10; j++){ 
      if(tabela[i][j] == 2){
        tabela[i][j] = 0;
      }
    }
  }
}

function movePeca(centro_peca, peca_atual){
  var peca = Array();
  switch (peca_atual){
    //traço
    case 0:
      switch (rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0], centro_peca[1] + 2]);
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 2, centro_peca[1]]);
          break;
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0], centro_peca[1] + 2]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 2, centro_peca[1]]);
          break;
      }
      break;

    // L
    case 1:
      switch (rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1] - 1]);
          break;
        // L cabeca pra baixo
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0] - 1, centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
      }
      break;

    // L invertido
    case 2:
      switch(rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1] - 1]);
          break;
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0] + 1, centro_peca[1] - 1]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
      }
      break;

    // quadrado
    case 3:
      switch(rotaciona_peca){
        default:     
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
    }
    break;
    // Z
    case 4:
      switch(rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);           
          peca.push([centro_peca[0] - 1, centro_peca[1]]);       
          peca.push([centro_peca[0], centro_peca[1] + 1]);       
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);   
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);  
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);           
          peca.push([centro_peca[0] - 1, centro_peca[1]]);       
          peca.push([centro_peca[0], centro_peca[1] + 1]);       
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);  
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
      }
      break;

    // Z invertido
    case 5:
      switch(rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);  
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);  
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);  
          peca.push([centro_peca[0] - 1, centro_peca[1] + 1]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);  
          peca.push([centro_peca[0] + 1, centro_peca[1] + 1]);
          break;
      }
      break;

    // T
    case 6:
      switch(rotaciona_peca){
        case 0:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);  
          peca.push([centro_peca[0], centro_peca[1] + 1]);
          break;
        case 1:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);  
          peca.push([centro_peca[0] + 1, centro_peca[1]]);
          break;
        case 2:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          peca.push([centro_peca[0] + 1, centro_peca[1]]);  
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          break;
        case 3:
          peca.push([centro_peca[0], centro_peca[1]]);
          peca.push([centro_peca[0], centro_peca[1] - 1]);
          peca.push([centro_peca[0], centro_peca[1] + 1]);  
          peca.push([centro_peca[0] - 1, centro_peca[1]]);
          break;
      }
      break;
  }
  return peca;
}

function atualizarTabela() {
  var bateuParede = false;
  switch(direction){
    case 2:
      //direita
      peca.forEach((pixel)=>{
        if(pixel[1] >= 9){
          bateuParede = true;
        }
      });
      if(!bateuParede){
        centro_peca[1] += 1;
      }
      break;
    case 3:
      //cima (ROTACIONA A PEÇA) 
      rotaciona_peca += 1;
      break;
    case 4:
      //esquerda
      peca.forEach((pixel)=>{
        if(pixel[1] <= 0){
          bateuParede = true;
        }
      });
      if(!bateuParede){
        centro_peca[1] -= 1; 
      }
    default:
      //baixo
      centro_peca[0] += 1;
      break;
  }
  var new_peca = movePeca(centro_peca, peca_atual);
  tocoupecas = false;
  tocouchao = false;

  //SE A LINHA 3 DA TABELA POSSUI PEÇAS SOLIDAS PERDEU
  tabela[3].forEach((frame)=>{
    if(frame == 1){
      perdeu = true;
    }
  });
  
  new_peca.forEach((pix_peca) => {
    if(pix_peca[0] > 24){
      //a peça tocou o chão
      tocouchao = true;
    }else if(tabela[pix_peca[0]][pix_peca[1]] == 1){
      //a peça tocou as peças já solidificadas
      tocoupecas = true;
    }
  });
  if(tocoupecas){
    return;
  }
  if(tocouchao){
    return;
  }
  if(perdeu){
    //a peca colidiu com as peças solidas
    paraJogo();
  }
  setaPecaTabela(new_peca);

}

function setaPecaTabela(new_peca){
  //APAGA A PEÇA ANTERIOR
  if(typeof(peca)!== 'undefined'){
    peca.forEach((pixel)=>{
      if(tabela[pixel[0]][pixel[1]] == 2){
        tabela[pixel[0]][pixel[1]] = 0;
      }
    });
  }
  //SETA A NOVA PEÇA NA TABELA
  new_peca.forEach((pixel)=>{
    tabela[pixel[0]][pixel[1]] = 2;
  });
  peca = new_peca;
}

function criaPeca(centro_peca) {
  // Gera uma das peças aleatórias
  peca_atual = parseInt(Math.floor(Math.random() * 7));
  switch(peca_atual){
    case 0:
      console.log('0 - traço');
      break;
    case 1:
      console.log('1 - L')
      break;
    case 2:
      console.log('2 - L invertido')
      break;
    case 3:
      console.log('3 - quadrado')
      break;
    case 4:
      console.log('4 - Z')
      break;
    case 5:
      console.log('5 - Z INVERTIDO')
      break;
    case 6:
      console.log('6 - T')
      break;
  }
  return movePeca(centro_peca, peca_atual)
  
}

function setDirection(keycode){
  // 40 - seta baixo  
  // 83 - S
  // 39 - seta direita
  // 68 - D
  // 38 - seta cima
  // 87 - W
  // 37 - seta esquerda
  // 65 - A
  if(keycode == 40 || keycode == 83){
    //baixo
    direction  = 1;
  }else if(keycode == 39 || keycode == 68){
    //direita
    direction  = 2;
  }else if(keycode == 38 || keycode == 87){
    //cima - (gira peca)
    if(rotaciona_peca < 3){
      rotaciona_peca += 1;
    }else{
      rotaciona_peca = 0;
    }
  }else if(keycode == 37 || keycode == 65){
    //esquerda
    direction  = 4;
  }else{
    return;
    // if(keycode == 32){
    //   //Clica espaço para pausar ou continuar o jogo 
    //   if(document.getElementById("pausar").style.visibility == "visible"){
    //     pausar();
    //   }else if(document.getElementById("continuar").style.visibility == "visible"){
    //     continuar();
    //   }
    // }
  }
  var peca = movePeca(centro_peca, peca_atual);
    // Atualiza a posição da tabela
    atualizarTabela(tabela,peca,centro_peca);
    if(tocoupecas || tocouchao){
      solidificaPeca();
    }
    // Desenha a cobra e a comida
    desenhar();
}

//VERIFICA SE OUVE PONTOS NA JOGADA E QUANTOS EM SEGUIDA ADEQUA A TABELA
function marcaPonto(){

  //FAZ A CONSULTA EM TODA A TABELA PARA SABER QUAIS LINHAS ESTÃO COMPLETAS;
  var aLinhasPontuadas = Array();
  for(i = 0; i < 25; i++){      
    var isLinhaCompleta = true;
    for(j = 0; j < 10; j++){    
      if(tabela[i][j] == 0 || tabela[i][j] == 2){
        isLinhaCompleta = false;
        break;
      }
    }
    if(isLinhaCompleta){
      aLinhasPontuadas.push(i)
    }
  }
  if(aLinhasPontuadas.length > 0){
    if(aLinhasPontuadas.length == 1){
      iPonto += 40 * nivel;
      pontos.lastElementChild.lastElementChild.innerHTML = iPonto;
    }else if(aLinhasPontuadas.length == 2){
      iPonto += 100 * nivel;
      pontos.lastElementChild.lastElementChild.innerHTML = iPonto;
    }else if(aLinhasPontuadas.length == 3){
      iPonto += 300 * nivel;
      pontos.lastElementChild.lastElementChild.innerHTML = iPonto;
    }else if(aLinhasPontuadas.length == 4){
      iPonto += 1200 * nivel;
      pontos.lastElementChild.lastElementChild.innerHTML = iPonto;
    }
    aLinhasPontuadas.forEach((linha) => {
      tabela.splice(linha, 1);
      tabela.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  }

}

//SETA AS CORES DOS QUADRADOS;
function desenhar(){
  for(var i = 0; i < 25; i++){      
      for(var j = 0; j < 10; j++){  
        indice = String(i) + String(j);
        if(tabela[i][j] == 0){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("campo").value;
        }else if(tabela[i][j] == 1){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("peca_solida").value;
        }else if(tabela[i][j] == 2){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("peca_livre").value;
        }
      }
  }
}

function paraJogo(){
  while (grid.lastElementChild) {
    grid.removeChild(grid.lastElementChild);
  }
  document.getElementById("iniciar").disabled = false;
  clearInterval(loop);
  alert('Vc perdeu');
  perdeu = false;
}

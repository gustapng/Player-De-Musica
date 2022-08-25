const tempoIn = document.querySelector(".tempoInicial");
const tempoFi = document.querySelector(".tempoFinal");
const barraTem = document.querySelector("#barraT");
const barraVo = document.querySelector("#barraV");

let positionMusic = 0;

let music_list_trap = [
  {
    musica:'Predestinado',
    artista:'Oruam',
    imagem:'https://i1.sndcdn.com/artworks-RgzSj7wXxZ0EchlB-6TmlzQ-t500x500.jpg',
    url:'audio/Predestinado.mp3'
  },
  {
    musica:'Jaguar',
    artista:'Brandão 85',
    imagem:'https://i1.sndcdn.com/artworks-4xxNDzmzuuBLItyV-DE8LZA-t500x500.jpg',
    url: 'audio/4.Jaguar-Beck-de-mel-Brandão85.mp3'
  },
  {
    musica:'Praise the Lord',
    artista:'A$AP Rocky',
    imagem:'https://m.media-amazon.com/images/I/81ADlEPj9sL._SS500_.jpg',
    url:'audio/praise-the-lord.mp3'
  },
  {
    musica:'Sheck Wes',
    artista:'Mo Bamba',
    imagem:'https://i.scdn.co/image/ab67616d0000b27359cd47039c5b10ed919fbaa8',
    url:'audio/Sheck-Wes-Mo-Bamba.mp3'
  },
  {
    musica:'Xo Tour Llf3',
    artista:'Lil uzi',
    imagem:'https://popnow.com.br/wp-content/uploads/2017/09/20987204_113830382650603_750656697319555072_n.jpg',
    url:'audio/Lil-Uzi-Vert-XO-Tour-Llif3.mp3'
  },
];

let music_list_alea = [
  {
    musica:'Dengo',
    artista:'João Gomes',
    imagem:'https://images.suamusica.com.br/6i_OPZLTKI4b27tLwoyN09NrDFQ=/500x500/47917586/3625477/cd_cover.jpg',
    url:'audio/DENGO-João Gomes.mp3'
  },
  {
    musica:'Amiga Da Minha Mulher',
    artista:'Seu Jorge',
    imagem:'https://i.scdn.co/image/ab67616d0000b27302a7d36e18face8178c73555',
    url:'audio/Amiga-da-Minha-Mulher.mp3'
  },
  {
    musica:'20 Ligações',
    artista:'Baco Exu do Blues',
    imagem:'https://i.scdn.co/image/ab67616d0000b2739ba77e3ca38205c4dbfc5e8b',
    url:'audio/Baco-Exu-do-Blues-20 Ligações.mp3'
  },
  {
    musica:'After Party',
    artista:'Don Toliver',
    imagem:'https://i1.sndcdn.com/artworks-SP9knHTU3izScHtY-BjXaUQ-t500x500.jpg',
    url:'audio/Don-Toliver-After-Party.mp3'
  },
  {
    musica:'Arctic Monkeys',
    artista:'505',
    imagem:'https://i.scdn.co/image/ab67616d0000b2730c8ac83035e9588e8ad34b90',
    url:'audio/505.mp3'
  },
];

let music_playlist = music_list_trap;

let audio = new Audio();

/* ----- função de mudar a imagem do botão play ----- */
document.querySelector('#play').addEventListener("click", function () {
    /* ----- reproduz o áudio ----- */
    audio.play();

    /* ----- ao clicar em play define o icone para pause ----- */
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#pause').style.display = 'inline-block';
});

/* ----- função de mudar a imagem do botão play ----- */
document.querySelector('#pause').addEventListener('click', () => {
    /* ----- reproduz o áudio ----- */
    audio.pause();

    /* ----- ao clicar em pause define o icone para play ----- */
    document.querySelector('#play').style.display = 'inline-block';
    document.querySelector('#pause').style.display = 'none';
})

/* ----- Pré define uma imagem ao abrir o projeto ----- */
document.querySelector('#imagem').src= 'img/gustaa.jpg';

/* ----- Recebe os parámetros na função e executa as seguintes funcionalidades ----- */
function tocarMusica(urlmusica, imagem, musica, artista) {
    /* ----- Se estiver tocando alguma música pausa ----- */
    audio.pause();
    /* ----- Define o audio a ser reproduzida ----- */
    audio = new Audio(urlmusica)
    /* ----- Reproduz o áudio ----- */
    audio.play()
    console.log(audio.src)
    /* ----- Após dar o play na música define o botão para pause ----- */
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#pause').style.display = 'inline-block';
    /* ----- Após dar o play na música define o botão para pause ----- */
    /* ----- Define a imagem que é o nome da música usando os valores que foram recebidos pelos parametros da função ----- */
    document.querySelector('#imagem').src= imagem;
    document.querySelector('#nomemsc').innerHTML= musica;
    document.querySelector('#nomeart').innerHTML= artista;

    /* ----- Muda o tempo que o audio está tocando de acordo com a posição da barra ----- */
    barraTem.addEventListener("click", (e) => {
    audio.currentTime = (e.offsetX / barraTem.offsetWidth) * audio.duration;
    });
    /* ----- Muda o tempo que o audio está tocando de acordo com a posição da barra ----- */

    /* ----- Atualiza musica o tempo da barra do audio ----- */
    audio.addEventListener("timeupdate", () => {
    barraTem.value = Math.floor((audio.currentTime / audio.duration) * 100);
    tempoIn.innerHTML = formatTime(Math.floor(audio.currentTime));
    tempoFi.innerHTML = formatTime(Math.floor(audio.duration));

    /* ----- Se o contador de audio tiver o mesmo tamanho pausa a música  ----- */
    if (audio.currentTime === audio.duration) {
      if($("#checkbox-repeat").prop("checked")) {
        audio.play();
      } else {
        document.getElementById('next').click()
      }
    }
    /* ----- Atualiza musica o tempo da barra do audio ----- */
  });
}


/* ----- pula para a próxima faixa de música seguindo a ordem ----- */
document.querySelector('#next').addEventListener('click', () => {
  let check = document.querySelector("#checkbox-random");
  if(check.checked) {
    positionMusic = rand(0, music_playlist.length)
  } else {
    positionMusic++;
  }
  if(positionMusic == music_playlist.length) {
    positionMusic = 0;
  }
  
  tocarMusica(music_playlist[positionMusic].url, music_playlist[positionMusic].imagem, music_playlist[positionMusic].musica, music_playlist[positionMusic].artista);
})
/* ----- pula para a próxima faixa de música seguindo a ordem ----- */


/* ----- volta para a ultima faixa de música seguindo a ordem ----- */
document.querySelector('#previous').addEventListener('click', () => {
    let check = document.querySelector("#checkbox-random");
    if(check.checked) {
      positionMusic = rand(0, music_playlist.length)
    } else {
      positionMusic--;
    }
    if(positionMusic < 0) {
      positionMusic = music_playlist.length;
    }
    tocarMusica(music_playlist[positionMusic].url , music_playlist[positionMusic].imagem, music_playlist[positionMusic].musica, music_playlist[positionMusic].artista);
})
/* ----- volta para a ultima faixa de música seguindo a ordem ----- */


/* ----- Função que ativa o funcionalidade de repetir o audio que parar de tocar */
document.querySelector('#repeat').addEventListener('click', () => {
  $("#checkbox-repeat").each(
    function() {
        if ($(this).prop("checked")) {
            $(this).prop("checked", false);
            document.querySelector('#repeat').src= "img/repeat.png"
        } else {
            $(this).prop("checked", true);
            document.querySelector('#repeat').src= "img/repeat-verde.png"
        }
    }
  )
})
/* ----- Função que ativa o funcionalidade de repetir o audio que parar de tocar */


/* ----- Função que marca e desmarca a caixa de música aleatória ativada ----- */
document.querySelector('#random').addEventListener('click', () => {
  $("#checkbox-random").each(
      function() {
          if ($(this).prop("checked")) {
              $(this).prop("checked", false);
              document.querySelector('#random').src= "img/random.png"
          } else {
              $(this).prop("checked", true);
              document.querySelector('#random').src= "img/random-verde.png"
          }
      }
  )});
/* ----- Função que marca e desmarca a caixa de música aleatória ativada ----- */


/* ----- Funcao de formatar os minutos e segundos ----- */
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec} `;
  }
/* ----- Funcao de formatar os minutos e segundos ----- */

/* Controla o volume do audio */
barraVo.addEventListener("change", (e) => {
  audio.volume = e.currentTarget.value / 100;
});
/* Controla o volume do audio */

/* ----- Funções que exibem a playlist que for clicada ----- */
function mudaPlaylistTrap() {
  document.querySelector('#playlist2').style.display= "none";
  document.querySelector('#playlist1').style.display= "block";
  music_playlist = music_list_trap;
}

function mudaPlaylistAlea() {
  document.querySelector('#playlist1').style.display= "none";
  document.querySelector('#playlist2').style.display= "block";
  music_playlist = music_list_alea;
}
/* ----- Funções que exibem a playlist que for clicada ----- */


/* ----- Função que cria número randomico ----- */
function rand(min, max){
  if(min == 0){
      return Math.floor((Math.random() * max) + 0);
  }else{
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
/* ----- Função que cria número randomico ----- */

/* ----- Função que cria as playlists dinamicamente ----- */

function injectPlaylistInView(playlist, selectordivinject) {
  var temp;
  
  for (i = 0; i < playlist.length; i++) {
    let url = playlist[i].url
    let imagem = playlist[i].imagem
    let musica = playlist[i].musica
    let artista = playlist[i].artista
    
    temp = document.createElement('div');
    temp.className = 'music-array';
    temp.innerHTML = '<div class="lista-musica row" onclick=" tocarMusica(\''+ url + '\', \'' + imagem + '\',\''+ musica +'\', \'' + artista + '\')"><p>' + (i+1) + '</p><img src="' + imagem + '" width="43" height="43"><div class="titulo-msc"><p>' + artista +'<p/>' + musica + '</div></div>'
    document.querySelector(selectordivinject).appendChild(temp);
  }
}

injectPlaylistInView(music_playlist, '#playlist1')
injectPlaylistInView(music_list_alea, '#playlist2')

/* ----- Função que criam as playlists dinamicamente ----- */


var wordlist = ['ron','confused','lackadaisical','fog','aquatic','capable','strange','apathetic','tap','wine','hungry','answer','haunt','stiff','knotty','drown','ahead','phobic','frightening','squealing','cheer','remain','tangible','nerve','incredible','bake','concern','harass','shocking','slippery','tomatoes','smile','reduce','discussion','large','jeans','baby','cloudy','entertain','crow','found','yam','befitting','piquant','invent','extend','concentrate','dream','two','cent','acidic','obtainable','farm','power','irritate','enthusiastic','permissible','week','frighten','popcorn','women','fool','minor','decision','trains','print','hands','hysterical','tub','squeamish','idiotic','responsible','partner','godly','rain','dolls','blue-eyed','alluring','stop','thought','drop','aunt','queen','accurate','appliance','duck','sofa','straight','female','ancient','current','gaze','sneaky','friends','best','dead','cable','unbiased','gleaming','punch']

var ind = 0
var activeIndex = null

const words = [];

var score = 0


var speed = 0.2;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function onload() {
    
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center'
    ctx.fillText('Click anywhere to start', canvas.width/2, canvas.height/2);
    ctx.textAlign = 'start'

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        document.body.innerHTML = 'Please switch to a computer';
    }

}
var scream;
function game() {
    shuffle(wordlist)
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var audio = new Audio('music.mp3');
    scream = new Audio('coolstuff.wav');

    setTimeout(()=> {audio.play()}, 5000)
    

    document.addEventListener('keydown', function(event) {
        if(activeIndex == null) {
            words.sort((a,b) => b[2]-a[2])
            for(let i=0;i<words.length;i++) {
                if(words[i][5] && words[i][0][0] == event.key) {
                    activeIndex = i
                    break;
                }
            }
        }
        if(event.key == words[activeIndex][0][words[activeIndex][3]]) {
            words[activeIndex][3]++
            if(words[activeIndex][0].length == words[activeIndex][3]) {
                words[activeIndex][5] = 0
                activeIndex = null
                score++
            }
        }
    
    });

    
    

    step = 3000;
    
    wordSpawner(canvas, ctx);

    const f = () => {
        wordSpawner(canvas, ctx);
        step = step*0.9;
        step = Math.max(step, 400);
        setTimeout(f, step)
    };

    setTimeout(f, step);
    
        

    setInterval(()=>{draw(canvas,ctx)}, 10);
}

function wordSpawner (canvas, ctx) {
    const word = wordlist[ind++];

    ctx.font = `${word[6]}px monospace`;
    x = Math.random() * (canvas.width-ctx.measureText(word).width);
    y = 0;

    words.push([word, x, y, 0, speed+(Math.random()*(speed/2)), 1, 16+Math.random()*8-4])

    speed+=0.01;
    
}

function draw(canvas, ctx) {

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let word of words) {
        if(word[2] > canvas.height || ind == wordlist.length) {
            var image = new Image();
            
            image.addEventListener('load',  () => {
                    scream.play();
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
            , false);
            image.src = './jeff.webp';
        }
    }
    ctx.font = `16px monospace`;
    ctx.fillStyle = 'white';
    console.log(ctx.measureText('Your score is: 0').height);
    ctx.fillText(`Your score is ${score}`, 30, canvas.height-20);

    for(let i=0;i<words.length;i++) {
        const word = words[i];
        ctx.font = `${word[6]}px monospace`;
        if(word[5])
            word[2] += word[4];
        ctx.fillStyle = 'red';
        ctx.fillText(word[0].substring(0,word[3]), word[1], word[2]);
        ctx.fillStyle = 'white';
        ctx.fillText(word[0].substring(word[3]), word[1]+ctx.measureText(word[0].substring(0,word[3])).width, word[2]);
    }


}
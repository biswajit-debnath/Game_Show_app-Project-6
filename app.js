let key_pad = document.querySelector('#qwerty');
let ul = document.querySelector('#phrase ul');
const strt_div = document.querySelector(".start");
let missed = 0;

//Setting the start button
strt_div.addEventListener('click', (ev)=> {
    if(ev.target.tagName == 'A' && ev.target.textContent === 'Start Game')
        strt_div.style.opacity = 0;
    if(ev.target.tagName == 'A' && ev.target.textContent === 'Reset Game'){
        missed = 0;
        let button_nos = key_pad.querySelectorAll('button');
        for(let i=0;i<button_nos.length;i++)
            button_nos[i].className = '';
        let letter_nos = ul.querySelectorAll('.letter');
        for(let i=0;i<letter_nos.length;i++)
            letter_nos[i].className = 'letter';
        }
        setTimeout(()=>{
            strt_div.style.display = 'none';
        },300);
});

let phrases = [
    'Shot In the Dark',
    'On the Same Page',
    'Break The Ice',
    'Fight Fire With Fire',
    'Needle In a Haystack'
];

let rand = 0;



function getRandomPhraseAsArray(arr){
    let new_arr=[];
    for(let i=0;i<arr[rand].length;i++)
        new_arr.push(arr[rand][i]);
    return new_arr;
}
function addPhraseToDisplay(arr) {
    for(let i=0;i<arr.length;i++){
        let li = document.createElement('li');
        if(arr[i] === ' ')
            li.className = 'space';
        else{
            li.textContent = arr[i];
            li.className = 'letter';
        }
        ul.appendChild(li); 
    } 
}
const current_phrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(current_phrase);

function checkLetter(pressed_key){
    let guess = null;
    for(let i=0;i<current_phrase.length;i++){
        if(pressed_key === current_phrase[i]){
            document.querySelectorAll('li')[i].className +=' show';
            guess = pressed_key;
        }
    }  
    return guess;
}
function checkWin() {
    let show_nos = document.querySelectorAll('.show');
    let letter_nos = document.querySelectorAll('.letter');
    if(missed === 5){
        strt_div.style.opacity = 1;
        strt_div.style.display = '';
        strt_div.className += ' lose';
        strt_div.querySelector('.title').textContent ='Game Over';
        strt_div.querySelector('.btn__reset').textContent ='Reset Game';
    }
    else if(show_nos.length === letter_nos.length){
        strt_div.style.opacity = 1;
        strt_div.style.display = '';
        strt_div.className += ' win';
        strt_div.querySelector('.title').textContent ='You Win';
        strt_div.querySelector('.btn__reset').textContent ='Reset Game';
    }
        
}

//lower case
for(let i=0; i<current_phrase.length;i++)
    current_phrase[i] = current_phrase[i].toLowerCase(); 
//setting the class to matched and unmatched character
key_pad.addEventListener('click', (ev)=> {
    if(ev.target.tagName === 'BUTTON'){
        ev.target.className = 'chosen';
        const key = ev.target.textContent;
        let letterFound = checkLetter(key); 
        if(letterFound === null){
            missed++;
        }
        checkWin(); 
    }   
});
const msgElement = document.getElementById('message');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Get speech recognition
let recognition = new window.SpeechRecognition();

// Start Recognition
recognition.start();
// Capture user speak
function onSpeak(e)
{
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}
// Write what user speaks
function writeMessage(msg)
{
    msgElement.innerHTML = `
    <div> You said:</div>
    <span class="box"> ${msg} </span>
    `;
}

// Check msg against number
function checkNumber(msg)
{
    const num = +msg;
    // Check if valid number
    if(Number.isNaN(num))
    {
        msgElement.innerHTML += `<div> That is not valid number</div>`
       return;
    }
    // Check in range
    if(num> 100 || num < 1)
    {
        msgElement.innerHTML = `<div> Number must be between 1 and 100</div>`;
        return;
    }

    // Check number
    if(num === randomNum)
    {
        document.body.innerHTML = 
        `
        <h2>
        Congrats you have guesses right number! <br> <br>
        It was ${num}
        </h2>
        <button class="play-again" id="play-again"> Play Again </button> `
    }
    else if(num > randomNum)
    {
        msgElement.innerHTML += `<div> GO LOWER!</div>`;
    }
    else
    {
        msgElement.innerHTML += `<div> GO HIGHER!
        </div>`;
    }

}

// Get random number
function getRandomNumber()
{
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result
recognition.addEventListener('result',onSpeak);
// End SR service
recognition.addEventListener('end', () => recognition.start());

// Refresh the page

document.addEventListener('click',e=>
{
    if(e.target.id == 'play-again')
    {
        window.location.reload();
    }
})
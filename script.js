//UI

var chat = document.getElementById('chat'),
    cli = document.getElementById('cli'),
    user = 'User',
    chatHistory = [],
    historyIndex = 0;

cli.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        // enter pressed, get the message
        var message = cli.value;
        // save to history
        chatHistory.push(capitalizeFirstLetter(message));
        // empty the cli
        cli.value = '';
        if (message !== 'clear') {
            // append the message to the chat
            appendMessage(message);
            // send the message to iris server
            //socket.emit('message', message);
        } else {
            // clear the chat
            chat.innerHTML = '';
        }
    }
});

cli.addEventListener('keydown', function(event) {
    /* navigate through the chatHistory array using the arrows keys */
    if (event.keyCode === 38 && chatHistory.length > 0) {               // arrow up
        if (historyIndex >= 0 && historyIndex < chatHistory.length) {
            cli.value = '';
            historyIndex += 1;
            cli.value = chatHistory[chatHistory.length - historyIndex];
        }
    } else if (event.keyCode === 40 && chatHistory.length > 0) {        // arrow down
        if (historyIndex > 0) {
            cli.value = '';
            historyIndex -= 1;
            if (historyIndex != 0) {
                cli.value = chatHistory[chatHistory.length - historyIndex];
            } else {
                cli.value = chatHistory[chatHistory.length - 1];
            }
            
        }
   }
});

/* Append message to the chat */
function appendMessage(message) {
    // reset chat history index
    historyIndex = 0;
    // create message item
    var chatMessage = document.createElement('li');
    chatMessage.className = 'message';
    chatMessage.textContent = user+' > '+capitalizeFirstLetter(message);
    chat.appendChild(chatMessage);
    chatMessage.scrollIntoView();
}

function responseMessage(message) {
  // reset chat history index
  historyIndex = 0;
  // create message item
  var chatMessage = document.createElement('li');
  chatMessage.className = 'message';
  chatMessage.textContent = 'L.A.K.A > '+capitalizeFirstLetter(message);
  chat.appendChild(chatMessage);
  chatMessage.scrollIntoView();
}




/* Capitalize the first letter of the first word */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}







const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = "40";
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (inputTxt.value !== "") {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = function () {
  speak();
};

/* function saluta(){
    const utterThis =  new SpeechSynthesisUtterance("Ciao, sono laka9. Il tuo assistente personale");
    utterThis.pitch = "1";
    utterThis.rate = "1";
    const selectedOption = 
    voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
            break;
        }
    }
    synth.speak(utterThis);
} */


let nome_utente = prompt('Come ti chiami?');

function listen() {

    var element = document.getElementById("activate");
    element.classList.add("active-voice");
    let inputArea = document.getElementById('input-area')
    let outputArea = document.getElementById('output-area')
  
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "it-IT";
    recognition.start();
  
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        if (transcript.includes("Ciao")) {
          responseMessage("Ciao, "+nome_utente+"!")
            const utterThis =  new SpeechSynthesisUtterance("Ciao, "+nome_utente+"!");
            utterThis.pitch = "1";
            utterThis.rate = "1";
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            synth.speak(utterThis);
        } else if (transcript.includes("meteo")) {
            window.open("https://www.google.com/search?q=meteo+torino")
        } else {
            const utterThis =  new SpeechSynthesisUtterance("Non capisco quello che dici, ma ho trovato alcune informazioni per te")
            utterThis.pitch = "1";
            utterThis.rate = "1";
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            synth.speak(utterThis)
            /* outputArea.innerHTML = "Non capisco quello che dici, ma ho trovato alcune informazioni per te" */
            responseMessage("Non capisco quello che dici, ma ho trovato alcune informazioni per te");
            window.open("http://google.com/search?q="+transcript, "_blank");
        }
        /* inputArea.innerHTML = event.results[0][0].transcript; */
        appendMessage(event.results[0][0].transcript)

      }
  }
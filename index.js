const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    //implement the start / pause and stop etc..
    const speech_recognition = new speechRecognition();
    const start = document.getElementById('startButton');
    const pause = document.getElementById('pauseButton');
    const stop = document.getElementById('stopButton');
    const textArea = document.getElementById('genText');
    speech_recognition.lang = 'en-US'; 
    speech_recognition.continuous = true; 
    speech_recognition.interimResults = true;
    let running = false;
    
    // get my speech and have it added to the textbox
    speech_recognition.onresult = (e) => {
        let transcript = '';
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        textArea.innerText = transcript;
    };

    start.addEventListener('click', () => {
        //this starts the recording
        if (!running){
            speech_recognition.start();
            running = true;
            console.log('Started recording');
        }
        
    });



    pause.addEventListener('click', () =>{
        if (running){
            speech_recognition.stop();
            running = false;
            console.log("Recording Paused"); 
        } 
    });

    stop.addEventListener('click', () =>{
        //this stops the recording
        speech_recognition.stop();
        console.log("Recording Stopped");
    });
    const copy = document.getElementById('copyButton');

    copy.addEventListener('click', () => {
        if (textArea.value == ''){
            alert('You need to start the recording');
        }else{
            navigator.clipboard.writeText(textArea.value);
            console.log('Text copied');
        }
    })
    speech_recognition.onerror = (e) => {
        console.error('An Error Occurred:', e.error);
    };

   } else {
     alert('Sorry, Speech Recognition is not supported in this browser, please use a different browser.');
   }



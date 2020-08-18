import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const voices = window.speechSynthesis.getVoices();
  console.log(voices);
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [csVal, setCsVal] = useState('');
  const [started, setStarted] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.onstart = () => setStarted(true);
  recognition.onresult = (event) => {
    setContent(event.results[0][0].transcript);
    setStarted(false);
  };
  useEffect(() => {
    const url =
      'https://www.cleverbot.com/getreply?key=CC94keHQxsdpwX6UOu19NxdoZLA';
    const input = `&input=${content}`;
    const cs = `&cs=${csVal}`;
    fetch(url + cs + input)
      .then((request) => request.json())
      .then((json) => {
        setCsVal(json.cs);
        setResponse(json.clever_output);
      });
  }, [content]);

  const readAloud = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = response;
    speech.voice = voices[9];
    speech.pitch = 0.3;
    speech.rate = 0.9;
    speech.volume = 0.2;
    window.speechSynthesis.speak(speech);
  };
  useEffect(() => {
    readAloud();
  }, [response]);
  return (
    <>
      <div className='container'>
        <div className='glitch' data-text={response}>
          {response}
        </div>
        <div className='glow'>{response}</div>
        <button
          class='subtitle'
          onClick={() => {
            if (started === false) {
              recognition.start();
            }
          }}
        >
          Talk Back
        </button>
      </div>
    </>
  );
}

export default App;

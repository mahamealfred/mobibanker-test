import React, { useRef } from "react";
import NotificationSound from "../images/audio/notificationsound.wav";

export default function NotificationSoundManager() {
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  return (
    
    <div className="App">
      <h1></h1>
      <div>
        <h2>Click To Hear Notification Sound</h2>
        <button onClick={playAudio}>Generate Notification Sound</button>
        <audio ref={audioPlayer} src={NotificationSound} />
      </div>
    </div>
  );
}
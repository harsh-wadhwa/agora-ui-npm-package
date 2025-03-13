# Agora UIKit for React (Typescript): 

Harsh Wadhwa 
https://github.com/harsh-wadhwa

> 3 Step Real Time Communication for React Applications (based on Agora's VideoSDK and RTM)
> Improved upon agora-react-uikit offered by Agora Team 

## Improvements over existing kit
1. Layout and UI fixes. (✅)
2. In call settings to change Audio Input devices and Video Input devices. (✅)
3. Supported enableAudio and enableVideo props to pass to kit, before joining a call (✅)
4. Supported cameraDevice(pass deviceId here) and microphoneDevice(pass deviceId here) props, before joining a call (✅)
5. Supported : control which users of video call can mute others' video and audio. (✅)

6. Change Audio Playback Device (Output) (...coming soon ⏲️) 
7. Option to pass prop for User picture to be shown instead of placeholder when camera is off. (...coming soon ⏲️)

### Supported New Props
RTC : enableAudio, enableVideo, cameraDeviceId, microphoneDeviceId
RTM : isThisUserAllowedToMuteOthers

### Installation
In your react application, run the following in a terminal: "npm i agora-custom-ui"

### Instructions for running the demo:
1. Add your Agora App ID to `/example/src/App.tsx`
2. Run `npm start` to start the bundler to build the library
3. Execute `cd example && npm start` to run the example app


### Usage

**Insert your Agora AppID and Token**.

**A simple sample app integrating Agora UI Kit:**
import React, {useState} from 'react';
import AgoraUIKit from 'agora-custom-ui';

const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: '<Agora App ID>',
    channel: 'test', // your agora channel
    token: '<Your channel Token>' // use null or skip if using app in testing mode
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default App;

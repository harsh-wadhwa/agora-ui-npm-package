# Agora React VideoUIKit - customized : Harsh Wadhwa

> Instantly integrate Agora video calling or streaming into your web application using a React based VideoUIKit.
> Starting this project to compensate where Agora's Video UI-Kit lags. This project implements changing media sources in video calls during and before a call is joined, UI fixes, using user pictures instead of bland icons and more.

## Getting started

### Installation
To a react application, add the following:

```bash
npm i agora-react-uikit
```

### Usage

**A simple sample app integrating Agora UI Kit:**
```jsx
import React, {useState} from 'react';
import AgoraUIKit from 'agora-react-uikit';

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
```

**Insert your Agora AppID and Token**.

### Instructions for running the demo:
1. Add your Agora App ID to `/example/src/App.tsx`
2. Run `npm start` to start the bundler to build the library
3. Execute `cd example && npm start` to run the example app

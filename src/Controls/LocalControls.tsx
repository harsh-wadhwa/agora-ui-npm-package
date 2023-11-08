import React, { useContext } from 'react'
import EndCall from './Local/EndCall'
import LocalAudioMute from './Local/LocalAudioMute'
import Screenshare from './Local/Screenshare'
import LocalVideoMute from './Local/LocalVideoMute'
import PropsContext from '../PropsContext'
import SettingsButton from './Local/SettingsButton'

function LocalControls() {
  const { styleProps, rtcProps } = useContext(PropsContext)
  const { localBtnContainer } = styleProps || {}

  return (
    <div
      style={{
        ...{
          backgroundColor: '#007bff',
          width: '100%',
          height: 60,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        },
        ...localBtnContainer
      }}
    >
      {rtcProps.role !== 'audience' && <LocalVideoMute />}
      {rtcProps.role !== 'audience' && <LocalAudioMute />}
      {rtcProps.role !== 'audience' && rtcProps.enableScreensharing && (
        <Screenshare />
      )}
      <EndCall />
      <SettingsButton />
    </div>
  )
}

export default LocalControls

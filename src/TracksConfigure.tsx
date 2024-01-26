import React, { useState, useEffect, useRef, PropsWithChildren } from 'react'
import { RtcPropsInterface, mediaStore } from './PropsContext'
import {
  ILocalVideoTrack,
  ILocalAudioTrack,
  createMicrophoneAndCameraTracks
} from 'agora-rtc-react'
import { TracksProvider } from './TracksContext'

const useTracks = createMicrophoneAndCameraTracks(
  { encoderConfig: {} },
  { encoderConfig: {} }
)
/**
 * React component that create local camera and microphone tracks and assigns them to the child components
 */
const TracksConfigure: React.FC<
  PropsWithChildren<Partial<RtcPropsInterface>>
> = (props) => {
  const [ready, setReady] = useState<boolean>(false)
  const [localVideoTrack, setLocalVideoTrack] =
    useState<ILocalVideoTrack | null>(null)
  const [localAudioTrack, setLocalAudioTrack] =
    useState<ILocalAudioTrack | null>(null)
  const { ready: trackReady, tracks, error } = useTracks()
  const mediaStore = useRef<mediaStore>({})
  const { enableAudio, enableVideo, cameraDeviceId, microphoneDeviceId } = props

  useEffect(() => {
    if (tracks !== null) {
      const audioTrack = tracks[0]
      const videoTrack = tracks[1]

      if (!enableAudio) {
        audioTrack.setEnabled(false)
      }
      if (!enableVideo) {
        videoTrack.setEnabled(false)
      }
      if (cameraDeviceId) {
        videoTrack.setDevice(cameraDeviceId)
      }
      if (microphoneDeviceId) {
        audioTrack.setDevice(microphoneDeviceId)
      }

      setLocalAudioTrack(audioTrack)
      setLocalVideoTrack(videoTrack)
      mediaStore.current[0] = {
        audioTrack: audioTrack,
        videoTrack: videoTrack
      }
      setReady(true)
    } else if (error) {
      console.error(error)
      setReady(false)
    }
    return () => {
      if (tracks) {
        // eslint-disable-next-line no-unused-expressions
        tracks[0]?.close()
        // eslint-disable-next-line no-unused-expressions
        tracks[1]?.close()
      }
    }
  }, [trackReady, error]) //, ready])

  return (
    <TracksProvider
      value={{
        localVideoTrack: localVideoTrack,
        localAudioTrack: localAudioTrack
      }}
    >
      {ready ? props.children : null}
    </TracksProvider>
  )
}

export default TracksConfigure

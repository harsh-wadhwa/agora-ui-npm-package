import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack
} from 'agora-rtc-react'
import TracksContext from '../TracksContext'
import { DialogContent, DialogTitle } from '@mui/material'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

function SelectMenuCamera() {
  const [cameraDeviceId, setCameraDeviceId] = React.useState('')
  const [availableCameraDevices, setAvailableCameraDevices] = useState<
    MediaDeviceInfo[]
  >([])
  const { localVideoTrack } = useContext(TracksContext)

  useEffect(() => {
    async function setThingsUp() {
      console.log(localVideoTrack)
      const cams = await AgoraRTC.getCameras()
      setAvailableCameraDevices([...cams])
    }
    setThingsUp()
  }, [])

  const handleChange = async (event: SelectChangeEvent) => {
    await (localVideoTrack as ICameraVideoTrack).setDevice(event.target.value)
    setCameraDeviceId(event.target.value as string)
  }

  return (
    <Box sx={{ marginTop: 5 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Camera</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={cameraDeviceId}
          label='Camera'
          onChange={handleChange}
        >
          {availableCameraDevices?.map((cam) => (
            <MenuItem key={cam?.deviceId} value={cam?.deviceId}>
              {cam?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

function SelectMenuMic() {
  const [micDeviceId, setMicDeviceId] = React.useState('')
  const [availableMicrophoneDevices, setAvailableMicrophoneDevices] = useState<
    MediaDeviceInfo[]
  >([])
  const { localAudioTrack } = useContext(TracksContext)

  useEffect(() => {
    async function setThingsUp() {
      console.log(localAudioTrack)
      const mics = await AgoraRTC.getMicrophones()
      setAvailableMicrophoneDevices([...mics])
    }
    setThingsUp()
  }, [])

  const handleChange = async (event: SelectChangeEvent) => {
    await (localAudioTrack as IMicrophoneAudioTrack).setDevice(
      event.target.value
    )
    setMicDeviceId(event.target.value as string)
  }

  return (
    <Box sx={{ marginTop: 5 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Microphone</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={micDeviceId}
          label='Microphone'
          onChange={handleChange}
        >
          {availableMicrophoneDevices?.map((mic) => (
            <MenuItem key={mic?.deviceId} value={mic?.deviceId}>
              {mic?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

/// the component below is the main component

export interface SimpleDialogProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent sx={{ minWidth: 350, maxWidth: 350 }}>
        <SelectMenuCamera />
        <SelectMenuMic />
      </DialogContent>
    </Dialog>
  )
}
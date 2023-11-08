import React, { useContext, useState } from 'react'
import BtnTemplate from '../BtnTemplate'
import PropsContext from '../../PropsContext'
import SettingsDialog from '../SettingsDialog'

function SettingsButton() {
  const { styleProps } = useContext(PropsContext)
  const { localBtnStyles } = styleProps || {}
  const { settings } = localBtnStyles || {}
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

  return (
    <div>
      <BtnTemplate
        style={settings}
        name='settings'
        onClick={() => setSettingsDialogOpen(true)}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
      />
    </div>
  )
}

export default SettingsButton

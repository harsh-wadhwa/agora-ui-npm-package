import React, { CSSProperties, useContext } from 'react'
import RtmContext from './RtmContext'
import PropsContext, { UIKitUser } from './PropsContext'

const Username = (props: { user: UIKitUser; style?: React.CSSProperties }) => {
  const { usernames } = useContext(RtmContext)
  const { rtmProps, styleProps } = useContext(PropsContext)
  const { user } = props

  console.log(user)
  console.log(usernames)
  console.log(rtmProps)

  return rtmProps?.displayUsername ? (
    <p style={{ ...styles.username, ...styleProps?.usernameText }}>
      {user.uid === 1 ? 'Screenshare' : usernames[user.uid]}
    </p>
  ) : (
    <React.Fragment />
  )
}

const styles = {
  username: {
    background: '#000000aa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    zIndex: 90,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: '125px',
  } as CSSProperties
}

export default Username

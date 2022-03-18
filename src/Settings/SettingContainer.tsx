import { Container } from '@mui/material'
import { useContext } from 'react'
import { SettingsContext } from '../Controllers/SettingsStore'
import SettingsGroup from './SettingsGroup'

const SettingContainer = () => {
  const { settings } = useContext(SettingsContext)
  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {Object.keys(settings).map((key) => (
        <SettingsGroup id={key} settingsGroup={settings[key]} />
      ))}
    </Container>
  )
}

export default SettingContainer

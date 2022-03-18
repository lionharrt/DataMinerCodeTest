import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SettingsGroupType } from '../Controllers/SettingsStore'
import SettingParent from './SettingParent'

type SettingsGroupProps = {
  settingsGroup: SettingsGroupType
  id: string
}
const SettingsGroup = ({ settingsGroup, id }: SettingsGroupProps) => {
  return (
    <Box width={'fit-content'}>
      <Typography marginBottom="1rem" fontWeight={600}>
        {settingsGroup.title}
      </Typography>
      <Box display="flex" justifyContent="space-around" alignItems="center" flexWrap="wrap" flexDirection={id === 'general' ? 'row' : 'column'}>
        {settingsGroup.settings.map((setting) => (
          <SettingParent setting={setting} groupId={id} />
        ))}
      </Box>
    </Box>
  )
}

export default SettingsGroup

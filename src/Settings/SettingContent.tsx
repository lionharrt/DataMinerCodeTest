import { Box, Select, Typography, MenuItem, useTheme } from '@mui/material'
import { useContext } from 'react'
import Switch from '../Components/Switch'
import { SettingsContext, SettingType } from '../Controllers/SettingsStore'

type SettingContentProps = {
  setting: SettingType
  groupId: string
  parentId?: string
}
const SettingContent = ({ setting, groupId, parentId }: SettingContentProps) => {
  const { handleChangeSetting } = useContext(SettingsContext)
  const theme = useTheme()
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" height="3rem">
      <Typography marginLeft="2rem" fontWeight={600} fontSize="0.8rem">
        {setting.name}
      </Typography>
      <Box display="flex" alignItems="center">
        {setting.numericValue !== undefined && (
          <Select
            sx={{
              height: '2rem',
              marginRight: '1rem',
              width: '5rem',
              border: 0,
              backgroundColor: 'black',

              '& fieldset': {
                border: 0,
              },
            }}
            type="number"
            value={setting.numericValue}
            onChange={(e) => {
              handleChangeSetting(setting.enabled, groupId, parentId ? parentId : setting.id, parentId ? setting.id : undefined, parseInt(`${e.target.value}`))
            }}
          >
            {Array.from(Array(100).keys()).map((number) => (
              <MenuItem value={number}>{number}</MenuItem>
            ))}
          </Select>
        )}
        <Switch
          theme={theme}
          checked={setting.enabled}
          onChange={(e) => {
            handleChangeSetting(e.target.checked, groupId, parentId ? parentId : setting.id, parentId ? setting.id : undefined)
          }}
        />
      </Box>
    </Box>
  )
}

export default SettingContent

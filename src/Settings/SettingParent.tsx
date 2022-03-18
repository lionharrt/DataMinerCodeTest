import { Accordion, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { PropsWithChildren, useContext } from 'react'
import { SettingType } from '../Controllers/SettingsStore'
import { UIContext } from '../Controllers/UIContextStore'
import SettingContent from './SettingContent'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type SettingParentProps = {
  setting: SettingType
  groupId: string
}
const SettingParent = ({ setting, groupId }: SettingParentProps) => {
  const { expanded, changeExpanded } = useContext(UIContext)

  const ContainerComponent = (props: PropsWithChildren<{}>) => {
    const sx = {
      marginBottom: groupId !== 'general' ? 0 : '1rem',
      padding: '1rem 0.25rem',
      backgroundColor: '#1a1a1a',
      border: groupId !== 'general' ? '5px solid #212020' : 0,
    }
    return setting.children ? (
      <Accordion sx={sx} expanded={setting.id === expanded}>
        {props.children || false}
      </Accordion>
    ) : (
      <Paper sx={sx}>{props.children}</Paper>
    )
  }
  return (
    <ContainerComponent>
      <Box display="flex" padding="0.5rem" width="21.5rem">
        <SettingContent setting={setting} groupId={groupId} />
        {setting.children && (
          <IconButton onClick={() => changeExpanded(setting.id)}>
            <KeyboardArrowDownIcon sx={{ transform: `rotate(${setting.id === expanded ? '180deg' : '0deg'})`, fill: 'white' }} />
          </IconButton>
        )}
      </Box>
      {setting.children && (
        <Box marginRight={'4rem'}>
          {setting.children.map((childSetting) => (
            <SettingContent setting={childSetting} parentId={setting.id} groupId={groupId} />
          ))}
        </Box>
      )}
    </ContainerComponent>
  )
}

export default SettingParent

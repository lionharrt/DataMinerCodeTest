import { createTheme, ThemeProvider } from '@mui/material'
import { SettingsContextContextMaker } from './Controllers/SettingsStore'
import { UIContextMaker } from './Controllers/UIContextStore'
import SettingContainer from './Settings/SettingContainer'
const theme = createTheme({
  palette: { mode: 'dark' },
})

function App() {
  //normally I would have another layer of a router here but for the sake of time and complexity I will Just house the settings container here
  return (
    <ThemeProvider theme={theme}>
      <SettingsContextContextMaker>
        <UIContextMaker>
          <SettingContainer />
        </UIContextMaker>
      </SettingsContextContextMaker>
    </ThemeProvider>
  )
}

export default App

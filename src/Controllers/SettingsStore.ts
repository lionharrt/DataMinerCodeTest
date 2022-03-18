import { useState } from 'react'
import { ContextGenerator } from '../Utils/ContextGenerator'

export type SettingType = {
  name: string
  id: string
  children?: SettingType[]
  enabled: boolean
  numericValue?: number
}

export type SettingsGroupType = {
  title: string
  settings: SettingType[]
}

export const settingsInitialState: { [settingId: string]: SettingsGroupType } = {
  general: {
    title: 'GENERAL',
    settings: [
      { name: 'CASE MANAGEMENT', id: 'case-management', enabled: true },
      { name: 'MAP TIMELINE', id: 'map-timeline', enabled: true },
      { name: 'VIEWS & BRIEFING', id: 'views-briefing', enabled: true },
      { name: 'NOTIFICATIONS', id: 'notifications', enabled: true },
      { name: 'MASS COMMUNICATIONS', id: 'mass-communications', enabled: true },
      { name: 'TRAFFIC CAMERAS', id: 'traffic-cameras', enabled: true },
    ],
  },
  'settings-1': {
    title: 'SETTINGS',
    settings: [
      { name: 'AUDIT LOG', id: 'audit-log', enabled: true },
      {
        name: 'USERS',
        id: 'users',
        enabled: true,
        children: [
          { name: 'USERS ADD', id: 'users-add', enabled: true },
          { name: 'USERS DELETE', id: 'users-delete', enabled: false },
          { name: 'USERS EDIT', id: 'users-edit', enabled: true },
          { name: 'MAX USERS', id: 'max-users', enabled: true, numericValue: 10 },
        ],
      },
    ],
  },
  'settings-2': {
    title: 'SETTINGS',
    settings: [
      { name: 'AUDIT LOG', id: 'audit-log', enabled: true },
      {
        name: 'USERS',
        id: 'users-2',
        enabled: true,
        children: [
          { name: 'USERS ADD', id: 'users-add', enabled: true },
          { name: 'USERS DELETE', id: 'users-delete', enabled: false },
          { name: 'USERS EDIT', id: 'users-edit', enabled: true },
          { name: 'MAX USERS', id: 'max-users', enabled: true, numericValue: 10 },
        ],
      },
    ],
  },
  alerts: {
    title: 'ALERTS',
    settings: [
      { name: 'ALERT MANAGER', id: 'alert-manager', enabled: true },
      { name: 'ALERT RULES', id: 'alert-rules', enabled: true, numericValue: 10 },
    ],
  },
}
export const useSettingsStore = () => {
  const [settings, setSettings] = useState(settingsInitialState)

  const handleChangeSetting = (enabled: boolean, settingGroupId: string, parentId: string, childId?: string, newNumericValue?: number) => {
    //if only parent id is provided change all else just the child
    const setAll = !childId

    const updatedSetting = {
      ...settings[settingGroupId],
    }
    const parentToUpdate = updatedSetting.settings.find((setting) => setting.id === parentId)
    if (!parentToUpdate) throw new Error('Unable to find Setting!')

    if (setAll) {
      //update parent and if they have children all those also
      parentToUpdate.enabled = enabled
      parentToUpdate.numericValue = newNumericValue ? newNumericValue : parentToUpdate.numericValue

      if (parentToUpdate?.children) {
        parentToUpdate.children = parentToUpdate.children.map((setting) => ({ ...setting, enabled }))
      }
    } else {
      //update only specific child
      const child = parentToUpdate.children?.find((setting) => setting.id === childId)
      if (!child) throw new Error('Unable to find Setting!')
      child.enabled = enabled
      child.numericValue = newNumericValue ? newNumericValue : child.numericValue
    }

    const newSettings = {
      ...settings,
      [settingGroupId]: updatedSetting,
    }

    setSettings(newSettings)
  }

  return {
    settings,
    handleChangeSetting,
  }
}

export const { context: SettingsContext, contextMaker: SettingsContextContextMaker } = ContextGenerator(useSettingsStore)

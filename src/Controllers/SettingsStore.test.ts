/* eslint-disable testing-library/no-node-access */
import { useSettingsStore, settingsInitialState } from './SettingsStore'
import { act, renderHook } from '@testing-library/react-hooks'

it('settings initializes with correct state', () => {
  const { result } = renderHook(() => useSettingsStore())

  expect(result.current.settings).toEqual(settingsInitialState)
})

it('can change enabled state of parent with no children', () => {
  const { result } = renderHook(() => useSettingsStore())
  const groupId = 'general'
  const parentId = settingsInitialState[groupId].settings[0].id

  const expectedResult = {
    ...settingsInitialState,
    [groupId]: {
      ...settingsInitialState[groupId],
      settings: [{ ...settingsInitialState[groupId].settings[0], enabled: false }, ...settingsInitialState[groupId].settings.slice(1)],
    },
  }
  act(() => {
    result.current.handleChangeSetting(false, groupId, parentId)
  })

  expect(result.current.settings).toEqual(expectedResult)
})

it('can change enabled state of single child', () => {
  const { result } = renderHook(() => useSettingsStore())
  const expectedResult = { ...settingsInitialState }
  const groupId = 'settings-1'
  const parent = expectedResult[groupId].settings[1]
  // eslint-disable-next-line testing-library/no-node-access
  const parentsChildren = parent.children
  if (!parentsChildren) throw new Error('Couldnt find parents children')
  const child = parentsChildren[0]
  if (!child) throw new Error('Couldnt find child')
  child.enabled = false

  act(() => {
    result.current.handleChangeSetting(false, groupId, parent.id, child.id)
  })

  expect(result.current.settings).toEqual(expectedResult)
})

it('can change enabled state of all children of parent', () => {
  const { result } = renderHook(() => useSettingsStore())
  const expectedResult = { ...settingsInitialState }

  const groupId = 'settings-1'
  const parent = expectedResult[groupId].settings[1]
  const parentsChildren = parent.children
  const parentsChildrenLength = parent.children?.length
  if (!parentsChildren) throw new Error('Couldnt find parents children')
  parentsChildren.forEach((child) => (child.enabled = false))

  act(() => {
    result.current.handleChangeSetting(false, groupId, parent.id, undefined)
  })

  expect(result.current.settings).toEqual(expectedResult)
  expect(result.current.settings[groupId].settings[1].children?.length).toEqual(parentsChildrenLength)
})

it('can change numeric state of parent with no children', () => {
  const { result } = renderHook(() => useSettingsStore())
  const groupId = 'alerts'
  const parentId = settingsInitialState[groupId].settings[1].id

  const expectedResult = {
    ...settingsInitialState,
    [groupId]: {
      ...settingsInitialState[groupId],
      settings: [settingsInitialState[groupId].settings[0], { ...settingsInitialState[groupId].settings[1], numericValue: 15 }, ...settingsInitialState[groupId].settings.slice(2)],
    },
  }
  act(() => {
    result.current.handleChangeSetting(true, groupId, parentId, undefined, 15)
  })
  expect(result.current.settings).toEqual(expectedResult)
})

it('can change numeric state of single child', () => {
  const { result } = renderHook(() => useSettingsStore())
  const expectedResult = { ...settingsInitialState }
  const groupId = 'settings-1'
  const parent = expectedResult[groupId].settings[1]
  // eslint-disable-next-line testing-library/no-node-access
  const parentsChildren = parent.children
  if (!parentsChildren) throw new Error('Couldnt find parents children')
  const child = parentsChildren[0]
  if (!child) throw new Error('Couldnt find child')
  child.numericValue = 5

  act(() => {
    result.current.handleChangeSetting(false, groupId, parent.id, child.id, 5)
  })

  expect(result.current.settings).toEqual(expectedResult)
})

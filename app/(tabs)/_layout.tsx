import { Tabs } from 'expo-router'
import React from 'react'
import { List, Settings } from '@/components/Icons'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <List className='text-foreground' />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings className='text-foreground' />,
        }}
      />
    </Tabs>
  )
}

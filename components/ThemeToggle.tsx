import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'next-themes'
import React from 'react'
import { Platform, Pressable, View } from 'react-native'
import { MoonStar, Sun } from '@/components/Icons'
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { useColorScheme } from '@/lib/useColorScheme'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    const newTheme = isDarkColorScheme ? 'light' : 'dark'

    if (Platform.OS === 'web') {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    } else {
      setColorScheme(newTheme)
      setAndroidNavigationBar(newTheme)
      AsyncStorage.setItem('theme', newTheme)
    }
  }
  return (
    <Pressable
      onPress={() => handleToggleTheme()}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'aspect-square flex-1 items-start justify-center web:px-5 pt-0.5',
            pressed && 'opacity-70',
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
          ) : (
            <Sun className='text-foreground' size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  )
}

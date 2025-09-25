import { useScrollToTop } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { Link, Stack } from 'expo-router'
import { Plus } from 'lucide-react-native'
import * as React from 'react'
import { Platform, Pressable, View } from 'react-native'
import { HabitCard } from '@/components/habit'
import { Text } from '@/components/ui/text'
import { useMigrationHelper } from '@/db/drizzle'
import { useDatabase } from '@/db/provider'
import { type Habit, habitTable } from '@/db/schema'

export default function Home() {
  const { success, error } = useMigrationHelper()

  if (error) {
    return (
      <View className='flex-1 gap-5 bg-secondary/30 p-6'>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }
  if (!success) {
    return (
      <View className='flex-1 gap-5 bg-secondary/30 p-6'>
        <Text>Migration is in progress...</Text>
      </View>
    )
  }

  return <ScreenContent />
}

function ScreenContent() {
  const { db } = useDatabase()

  const ref = React.useRef(null)
  useScrollToTop(ref)

  const renderItem = React.useCallback(
    ({ item }: { item: Habit }) => (
      <HabitCard
        {...item}
        enableNotifications={item.enableNotifications ?? false}
        archived={item.archived ?? false}
      />
    ),
    [],
  )

  if (!db) {
    return (
      <View className='flex-1 items-center justify-center bg-secondary/30'>
        <Text>Loading database...</Text>
      </View>
    )
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: <>
  const { data: habits, error } = useLiveQuery(
    db.select().from(habitTable).where(eq(habitTable.archived, false)),
  )

  if (error) {
    return (
      <View className='flex-1 items-center justify-center bg-secondary/30'>
        <Text className='pb-2 text-destructive'>Error Loading data</Text>
      </View>
    )
  }

  return (
    <View className='flex basis-full flex-col bg-background p-8'>
      <Stack.Screen
        options={{
          title: 'Habits',
        }}
      />
      <FlashList
        ref={ref}
        className='native:overflow-hidden rounded-t-lg'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>
            <Text className='text-lg'>Hi There 👋</Text>
            <Text className='text-sm'>
              This example use sql.js on Web and expo/sqlite on native
            </Text>
            {Platform.OS !== 'web' && (
              <Text className='text-sm'>
                If you change the schema, you need to run{' '}
                <Text className='bg-muted font-mono text-muted-foreground text-sm'>
                  bun db:generate
                </Text>
                <Text className='px-1 text-sm'>then</Text>
                <Text className='bg-muted font-mono text-muted-foreground text-sm'>
                  bun migrate
                </Text>
              </Text>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View className='p-2' />}
        data={habits}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListFooterComponent={<View className='py-4' />}
      />
      <View className='absolute right-8 bottom-10 web:bottom-20'>
        <Link href='/create' asChild>
          <Pressable>
            <View className='h-[45px] w-[45px] justify-center rounded-full bg-primary'>
              <Plus className='self-center text-background' />
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

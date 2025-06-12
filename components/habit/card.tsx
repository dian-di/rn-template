import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import type { Habit } from '@/db/schema'
import { Link } from 'expo-router'
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'
import { Pressable, View } from 'react-native'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

type HabitProps = {
  onRestore?: (HabitId: string) => void
  onDelete?: (HabitId: string) => void
} & Habit

export const HabitCard: React.FC<HabitProps> = ({
  id,
  name,
  description,
  category,
  archived,
  onRestore,
  onDelete,
}: HabitProps) => {
  return archived ? (
    <View>
      <Card className='rounded-2xl'>
        <CardHeader>
          <View className='flex-row gap-4 items-center'>
            <CardTitle className='pb-2'>{name}</CardTitle>
            <Badge variant='outline'>
              <Text>{category}</Text>
            </Badge>
          </View>

          <View className='flex-col'>
            <CardDescription className='text-base font-semibold'>
              {description}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent />
        <CardFooter className='flex-row justify-end gap-2 flex-1 '>
          <Button
            variant='ghost'
            className='text-destructive '
            onPress={() => onDelete?.(id)}
          >
            <Text className='text-destructive'>Delete permanently</Text>
          </Button>
          <Button className='bg-pink-600' onPress={() => onRestore?.(id)}>
            <Text>Restore</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  ) : (
    <Link href={`/habits/${id}`} asChild>
      <Pressable>
        <Card className='rounded-2xl'>
          <CardHeader>
            <View className='flex-row gap-4 items-center'>
              <CardTitle className='pb-2'>{name}</CardTitle>
              <Badge variant='outline'>
                <Text>{category}</Text>
              </Badge>
            </View>

            <View className='flex-col'>
              <CardDescription className='text-base font-semibold'>
                {description}
              </CardDescription>
            </View>
          </CardHeader>
          <CardContent />
          <CardFooter className='flex-col gap-3 flex-1'>
            <Progress
              value={10}
              className='h-2'
              indicatorClassName='bg-sky-600'
            />
          </CardFooter>
        </Card>
      </Pressable>
    </Link>
  )
}

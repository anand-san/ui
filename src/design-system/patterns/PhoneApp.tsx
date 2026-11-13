import {
  Bell,
  BookOpen,
  ChartColumn,
  Circle,
  CircleCheck,
  CircleDashed,
  GlassWater,
  ListChecks,
  type LucideIcon,
  NotebookPen,
  PersonStanding,
  Pill,
  Plus,
  Settings,
  Sprout,
} from 'lucide-react';
import { type FormEvent, useId, useState } from 'react';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { Field } from '@/design-system/components/Field/Field';
import { Gauge } from '@/design-system/components/Gauge/Gauge';
import { Input } from '@/design-system/components/Input/Input';
import {
  List,
  ListItem,
  ListSection,
} from '@/design-system/components/List/List';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/Select/Select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/design-system/components/Sheet/Sheet';
import { Switch } from '@/design-system/components/Switch/Switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/design-system/components/Tabs/Tabs';
import { Text } from '@/design-system/components/Text/Text';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

interface Habit {
  id: string;
  name: string;
  time: TimeOfDay;
  icon: LucideIcon;
  streak: number;
  done: boolean;
  reminder: boolean;
}

const timesOfDay: { value: TimeOfDay; label: string; reminder: string }[] = [
  { value: 'morning', label: 'Morning', reminder: '8:00' },
  { value: 'afternoon', label: 'Afternoon', reminder: '13:00' },
  { value: 'evening', label: 'Evening', reminder: '21:00' },
];

const startingHabits: Habit[] = [
  {
    id: 'water',
    name: 'Drink a glass of water',
    time: 'morning',
    icon: GlassWater,
    streak: 12,
    done: true,
    reminder: true,
  },
  {
    id: 'stretch',
    name: 'Stretch for ten minutes',
    time: 'morning',
    icon: PersonStanding,
    streak: 4,
    done: true,
    reminder: false,
  },
  {
    id: 'vitamins',
    name: 'Take vitamins',
    time: 'morning',
    icon: Pill,
    streak: 21,
    done: true,
    reminder: true,
  },
  {
    id: 'read',
    name: 'Read 20 pages',
    time: 'evening',
    icon: BookOpen,
    streak: 7,
    done: false,
    reminder: true,
  },
  {
    id: 'journal',
    name: 'Write three lines',
    time: 'evening',
    icon: NotebookPen,
    streak: 2,
    done: false,
    reminder: false,
  },
];

const pastDays = [
  { day: 'Monday', date: '9 November', done: 5 },
  { day: 'Tuesday', date: '10 November', done: 4 },
];

const comingDays = [
  { day: 'Thursday', date: '12 November' },
  { day: 'Friday', date: '13 November' },
  { day: 'Saturday', date: '14 November' },
  { day: 'Sunday', date: '15 November' },
];

const appTabs = [
  { id: 'habits', label: 'Habits', icon: ListChecks },
  { id: 'progress', label: 'Progress', icon: ChartColumn },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function streakText(habit: Habit) {
  const days = habit.streak + (habit.done ? 1 : 0);
  return days === 0 ? 'Start today' : `${days}-day streak`;
}

export interface PhoneAppScreenProps {
  sheetOpen?: boolean;
}

export function PhoneAppScreen({ sheetOpen = false }: PhoneAppScreenProps) {
  const formId = useId();
  const [habits, setHabits] = useState(startingHabits);
  const [view, setView] = useState('today');
  const [adding, setAdding] = useState(sheetOpen);
  const [name, setName] = useState('');
  const [time, setTime] = useState<TimeOfDay>('morning');
  const [reminder, setReminder] = useState(true);
  const [triedEmpty, setTriedEmpty] = useState(false);

  const total = habits.length;
  const done = habits.filter(habit => habit.done).length;
  const next = habits.find(habit => !habit.done);
  const chosenTime =
    timesOfDay.find(option => option.value === time) ?? timesOfDay[0];

  function toggle(id: string, checked: boolean) {
    setHabits(current =>
      current.map(habit =>
        habit.id === id ? { ...habit, done: checked } : habit,
      ),
    );
  }

  function chooseTime(value: string) {
    const option = timesOfDay.find(item => item.value === value);
    if (option) setTime(option.value);
  }

  function changeOpen(open: boolean) {
    setAdding(open);
    if (!open) setTriedEmpty(false);
  }

  function addHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setTriedEmpty(true);
      return;
    }
    setHabits(current => [
      ...current,
      {
        id: `new-${current.length}`,
        name: trimmed,
        time,
        icon: Sprout,
        streak: 0,
        done: false,
        reminder,
      },
    ]);
    setName('');
    setTriedEmpty(false);
    setAdding(false);
  }

  return (
    <Sheet open={adding} onOpenChange={changeOpen}>
      <div
        data-density="comfortable"
        className="flex min-h-dvh flex-col bg-canvas text-ink"
      >
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 pt-6 pb-8">
          <header className="flex items-end justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <Text variant="caption">
                {view === 'today'
                  ? 'Wednesday, 11 November'
                  : '9 to 15 November'}
              </Text>
              <Text variant="title-1">Habits</Text>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <SheetTrigger asChild>
                <Button variant="tinted" icon aria-label="New habit">
                  <Plus />
                </Button>
              </SheetTrigger>
              <Avatar name="Sam Rivera" size="lg" />
            </div>
          </header>
          <Tabs value={view} onValueChange={setView}>
            <TabsList className="w-full">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="flex flex-col gap-6">
              <Card className="flex-row items-center">
                <Gauge
                  value={done}
                  max={total}
                  label="Habits done today"
                  tone={done === total ? 'success' : 'accent'}
                >
                  {done}/{total}
                </Gauge>
                <CardHeader className="flex-1">
                  <CardTitle as="h2">
                    {done === total
                      ? 'All done for today'
                      : `${done} of ${total} done`}
                  </CardTitle>
                  <CardDescription>
                    {next
                      ? `Next up: ${next.name}`
                      : 'Every habit is kept. See you tomorrow.'}
                  </CardDescription>
                </CardHeader>
              </Card>
              {timesOfDay.map(option => {
                const group = habits.filter(
                  habit => habit.time === option.value,
                );
                if (group.length === 0) return null;
                return (
                  <ListSection key={option.value} title={option.label}>
                    <List>
                      {group.map(habit => {
                        const Icon = habit.icon;
                        return (
                          <ListItem
                            key={habit.id}
                            leading={<Icon />}
                            title={habit.name}
                            description={streakText(habit)}
                            trailing={
                              <Checkbox
                                checked={habit.done}
                                onCheckedChange={checked =>
                                  toggle(habit.id, checked === true)
                                }
                                aria-label={habit.name}
                              />
                            }
                          />
                        );
                      })}
                    </List>
                  </ListSection>
                );
              })}
            </TabsContent>
            <TabsContent value="week">
              <ListSection
                title="This week"
                footer="A day is complete when every habit is done."
              >
                <List>
                  {pastDays.map(item => (
                    <ListItem
                      key={item.day}
                      leading={
                        item.done === 5 ? (
                          <CircleCheck className="text-success" />
                        ) : (
                          <Circle />
                        )
                      }
                      title={item.day}
                      description={item.date}
                      trailing={`${item.done} of 5`}
                    />
                  ))}
                  <ListItem
                    leading={
                      done === total ? (
                        <CircleCheck className="text-success" />
                      ) : (
                        <Circle />
                      )
                    }
                    title="Today"
                    description="11 November"
                    trailing={`${done} of ${total}`}
                  />
                  {comingDays.map(item => (
                    <ListItem
                      key={item.day}
                      leading={<CircleDashed />}
                      title={item.day}
                      description={item.date}
                    />
                  ))}
                </List>
              </ListSection>
            </TabsContent>
          </Tabs>
        </main>
        <nav
          aria-label="App"
          className="sticky bottom-0 border-t border-separator bg-surface"
        >
          <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-2 px-4 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
            {appTabs.map(tab => {
              const Icon = tab.icon;
              const current = tab.id === 'habits';
              return (
                <Button
                  key={tab.id}
                  variant="plain"
                  tone={current ? 'accent' : 'neutral'}
                  shape="rounded"
                  asChild
                  className="h-auto flex-col gap-0.5 px-2 py-1 [&_svg]:size-6"
                >
                  <a
                    href={`#${tab.id}`}
                    aria-current={current ? 'page' : undefined}
                  >
                    <Icon aria-hidden />
                    <Text
                      as="span"
                      variant="caption"
                      tone={current ? 'accent' : 'default'}
                    >
                      {tab.label}
                    </Text>
                  </a>
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
      <SheetContent
        side="bottom"
        data-density="comfortable"
        className="mx-auto w-full max-w-md"
      >
        <form onSubmit={addHabit} noValidate className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>New habit</SheetTitle>
            <SheetDescription>Small and daily works best.</SheetDescription>
          </SheetHeader>
          <Field
            label="Name"
            id={`${formId}-name`}
            required
            error={
              triedEmpty && !name.trim() ? 'Give the habit a name.' : undefined
            }
          >
            <Input
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Walk after lunch"
              autoComplete="off"
            />
          </Field>
          <Field label="Time of day" id={`${formId}-time`}>
            <Select value={time} onValueChange={chooseTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-density="comfortable">
                {timesOfDay.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <List className="bg-surface-inset">
            <ListItem
              leading={<Bell />}
              title="Remind me"
              description={`Every day at ${chosenTime.reminder}`}
              trailing={
                <Switch
                  checked={reminder}
                  onCheckedChange={setReminder}
                  aria-label="Remind me"
                />
              }
            />
          </List>
          <SheetFooter>
            <Button type="submit">Add habit</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

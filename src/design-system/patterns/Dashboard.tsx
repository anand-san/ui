import {
  ArrowDownRight,
  ArrowUpRight,
  CircleHelp,
  LogOut,
  Plus,
  Settings,
  TriangleAlert,
  User,
} from 'lucide-react';
import { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/design-system/components/Alert/Alert';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { Field } from '@/design-system/components/Field/Field';
import { Gauge } from '@/design-system/components/Gauge/Gauge';
import { List, ListItem } from '@/design-system/components/List/List';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/design-system/components/NavigationMenu/NavigationMenu';
import { navigationMenuItemClass } from '@/design-system/components/NavigationMenu/navigationMenuStyles';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { Progress } from '@/design-system/components/Progress/Progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/Select/Select';
import { Separator } from '@/design-system/components/Separator/Separator';
import {
  type StatusOption,
  StatusMenu,
} from '@/design-system/components/StatusMenu/StatusMenu';
import { Text } from '@/design-system/components/Text/Text';

type Range = '7d' | '30d' | 'year';

interface Stat {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

interface Report {
  label: string;
  comparison: string;
  stats: Stat[];
  channels: { name: string; share: number }[];
}

const REPORTS: Record<Range, Report> = {
  '7d': {
    label: 'Last 7 days',
    comparison: 'vs the 7 days before',
    stats: [
      { label: 'Revenue', value: '$4,860', change: '+8.2%', up: true },
      { label: 'Orders', value: '72', change: '+12.5%', up: true },
      { label: 'Average order', value: '$67.50', change: '−3.8%', up: false },
      { label: 'New customers', value: '31', change: '+6.9%', up: true },
    ],
    channels: [
      { name: 'Online store', share: 58 },
      { name: 'Craft markets', share: 22 },
      { name: 'Instagram', share: 14 },
      { name: 'Wholesale', share: 6 },
    ],
  },
  '30d': {
    label: 'Last 30 days',
    comparison: 'vs the 30 days before',
    stats: [
      { label: 'Revenue', value: '$18,940', change: '+14.6%', up: true },
      { label: 'Orders', value: '281', change: '+9.3%', up: true },
      { label: 'Average order', value: '$67.40', change: '+4.8%', up: true },
      { label: 'New customers', value: '118', change: '−2.5%', up: false },
    ],
    channels: [
      { name: 'Online store', share: 54 },
      { name: 'Craft markets', share: 19 },
      { name: 'Instagram', share: 17 },
      { name: 'Wholesale', share: 10 },
    ],
  },
  year: {
    label: 'This year',
    comparison: 'vs this time last year',
    stats: [
      { label: 'Revenue', value: '$164,320', change: '+22.4%', up: true },
      { label: 'Orders', value: '2,436', change: '+18.1%', up: true },
      { label: 'Average order', value: '$67.46', change: '+3.6%', up: true },
      { label: 'New customers', value: '1,092', change: '+27.3%', up: true },
    ],
    channels: [
      { name: 'Online store', share: 49 },
      { name: 'Craft markets', share: 24 },
      { name: 'Wholesale', share: 15 },
      { name: 'Instagram', share: 12 },
    ],
  },
};

const isRange = (value: string): value is Range => value in REPORTS;

type OrderStatus = 'New' | 'Packing' | 'Shipped' | 'Delivered' | 'Refunded';

const ORDER_STATUSES: StatusOption<OrderStatus>[] = [
  { value: 'New', tone: 'highlight' },
  { value: 'Packing', tone: 'warning' },
  { value: 'Shipped', tone: 'info' },
  { value: 'Delivered', tone: 'success' },
  { value: 'Refunded', tone: 'neutral' },
];

interface Order {
  id: string;
  customer: string;
  placed: string;
  total: string;
  status: OrderStatus;
}

const ORDERS: Order[] = [
  {
    id: '1052',
    customer: 'Ada Lovelace',
    placed: '8 min ago',
    total: '$84.00',
    status: 'New',
  },
  {
    id: '1051',
    customer: 'Grace Hopper',
    placed: '34 min ago',
    total: '$42.00',
    status: 'New',
  },
  {
    id: '1050',
    customer: 'Alan Turing',
    placed: '1 hour ago',
    total: '$126.50',
    status: 'Packing',
  },
  {
    id: '1049',
    customer: 'Katherine Johnson',
    placed: '3 hours ago',
    total: '$38.00',
    status: 'Shipped',
  },
  {
    id: '1048',
    customer: 'Margaret Hamilton',
    placed: 'Yesterday',
    total: '$212.00',
    status: 'Delivered',
  },
  {
    id: '1047',
    customer: 'Dorothy Vaughan',
    placed: 'Yesterday',
    total: '$96.00',
    status: 'Delivered',
  },
];

const NAV = ['Overview', 'Orders', 'Customers', 'Reports'];

export function DashboardScreen() {
  const [range, setRange] = useState<Range>('7d');
  const [orders, setOrders] = useState(ORDERS);
  const report = REPORTS[range];
  const toShip = orders.filter(
    order => order.status === 'New' || order.status === 'Packing',
  ).length;

  const changeStatus = (id: string, status: OrderStatus) =>
    setOrders(current =>
      current.map(order => (order.id === id ? { ...order, status } : order)),
    );

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-20 border-b border-separator material">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 md:px-8">
          <div className="flex items-center gap-2">
            <Avatar name="Fernhill Pottery" tone="accent" size="sm" />
            <Text variant="headline">Fernhill Pottery</Text>
          </div>
          <NavigationMenu className="order-last -mx-4 max-w-none basis-full justify-start overflow-x-auto px-4 md:order-none md:mx-0 md:basis-auto md:overflow-visible md:px-0">
            <NavigationMenuList>
              {NAV.map(item => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    href={`#${item.toLowerCase()}`}
                    active={item === 'Overview'}
                    className={navigationMenuItemClass}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="plain"
                tone="neutral"
                icon
                aria-label="Account"
                className="ml-auto"
              >
                <Avatar name="Ada Lovelace" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <Text as="span" variant="headline">
                  Ada Lovelace
                </Text>
                <Text as="span" variant="caption">
                  ada@example.com
                </Text>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Shop settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleHelp />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <PageHeader
          title="Overview"
          description="How the shop is doing, and the orders that need you."
          actions={
            <div className="flex w-full items-end gap-2 sm:w-auto">
              <Field label="Period" id="overview-period" className="flex-1">
                <Select
                  value={range}
                  onValueChange={value => isRange(value) && setRange(value)}
                >
                  <SelectTrigger className="sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(REPORTS).map(([value, item]) => (
                      <SelectItem key={value} value={value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Button>
                <Plus />
                Add product
              </Button>
            </div>
          }
        />
        <Alert tone="warning">
          <TriangleAlert />
          <AlertTitle>3 products are almost sold out</AlertTitle>
          <AlertDescription>
            Speckled mug, Tall bud vase and Olive bowl have fewer than 5 left.
          </AlertDescription>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="tinted" tone="neutral">
              Review stock
            </Button>
          </div>
        </Alert>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {report.stats.map(stat => (
            <Card key={stat.label} className="gap-1">
              <div className="flex items-center justify-between gap-2">
                <Text variant="subhead" tone="secondary">
                  {stat.label}
                </Text>
                <Badge tone={stat.up ? 'success' : 'danger'}>
                  {stat.up ? <ArrowUpRight /> : <ArrowDownRight />}
                  {stat.change}
                </Badge>
              </div>
              <Text as="p" variant="title-1" numeric>
                {stat.value}
              </Text>
              <Text variant="caption">{report.comparison}</Text>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="gap-3 p-0 pt-inset lg:col-span-2">
            <CardHeader className="px-inset">
              <CardTitle as="h2">Recent orders</CardTitle>
              <CardDescription>
                {toShip === 0
                  ? 'Everything has shipped'
                  : `${toShip} waiting to ship`}
              </CardDescription>
              <CardAction>
                <Button variant="link" asChild>
                  <a href="#orders">See all</a>
                </Button>
              </CardAction>
            </CardHeader>
            <List className="rounded-t-none">
              {orders.map(order => (
                <ListItem
                  key={order.id}
                  leading={<Avatar name={order.customer} />}
                  title={order.customer}
                  description={`#${order.id} · ${order.placed}`}
                  trailing={
                    <span className="flex flex-col-reverse items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <StatusMenu
                        label="Order status"
                        value={order.status}
                        options={ORDER_STATUSES}
                        onValueChange={status => changeStatus(order.id, status)}
                      />
                      <Text
                        as="span"
                        numeric
                        className="min-w-16 text-right text-ink"
                      >
                        {order.total}
                      </Text>
                    </span>
                  }
                />
              ))}
            </List>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as="h2">November goal</CardTitle>
              <CardDescription>$7,640 of $20,000 in sales</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Gauge value={38} label="November sales goal">
                38%
              </Gauge>
              <Text variant="subhead" tone="secondary">
                19 days left. At this pace you will reach it on 29 November.
              </Text>
            </CardContent>
            <Separator />
            <section
              aria-labelledby="sales-by-channel"
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-0.5">
                <Text as="h3" id="sales-by-channel" variant="headline">
                  Sales by channel
                </Text>
                <Text variant="caption">
                  Share of revenue, {report.label.toLowerCase()}
                </Text>
              </div>
              {report.channels.map(channel => (
                <div key={channel.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Text variant="subhead">{channel.name}</Text>
                    <Text variant="subhead" tone="secondary" numeric>
                      {channel.share}%
                    </Text>
                  </div>
                  <Progress value={channel.share} label={channel.name} />
                </div>
              ))}
            </section>
          </Card>
        </div>
      </main>
    </div>
  );
}

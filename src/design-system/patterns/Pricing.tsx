import { Check, Feather, Menu } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design-system/components/Accordion/Accordion';
import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/design-system/components/NavigationMenu/NavigationMenu';
import { navigationMenuItemClass } from '@/design-system/components/NavigationMenu/navigationMenuStyles';
import { Separator } from '@/design-system/components/Separator/Separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/design-system/components/Tabs/Tabs';
import { Mark } from '@/design-system/components/Text/Mark';
import { Text } from '@/design-system/components/Text/Text';
import { focusRing, touchTarget } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

type Billing = 'monthly' | 'yearly';

interface Plan {
  name: string;
  description: string;
  price: Record<Billing, number>;
  caption: string;
  note: Record<Billing, string>;
  features: string[];
  cta: string;
  featured?: boolean;
}

const LINKS = ['Product', 'Pricing', 'Docs', 'Blog'];

const BILLING: Billing[] = ['monthly', 'yearly'];

const PLANS: Plan[] = [
  {
    name: 'Free',
    description: 'For your own notes and plans.',
    price: { monthly: 0, yearly: 0 },
    caption: 'for up to 3 people',
    note: { monthly: 'No card needed', yearly: 'No card needed' },
    features: [
      'Up to 3 people',
      '200 notes',
      '7 days of history',
      'Web, desktop and mobile apps',
    ],
    cta: 'Start for free',
  },
  {
    name: 'Pro',
    description: 'For small teams that plan together.',
    price: { monthly: 10, yearly: 8 },
    caption: 'per person / month',
    note: {
      monthly: 'Billed monthly',
      yearly: '$96 per person, billed yearly',
    },
    features: [
      'Up to 25 people',
      'Unlimited notes',
      'Full history and restore',
      'Shared plans and calendars',
      'Priority email support',
    ],
    cta: 'Start a free trial',
    featured: true,
  },
  {
    name: 'Team',
    description: 'For companies with many teams.',
    price: { monthly: 20, yearly: 16 },
    caption: 'per person / month',
    note: {
      monthly: 'Billed monthly',
      yearly: '$192 per person, billed yearly',
    },
    features: [
      'Unlimited people',
      'Everything in Pro',
      'Single sign-on',
      'Admin roles and audit log',
      'A named contact',
    ],
    cta: 'Talk to sales',
  },
];

const QUESTIONS = [
  {
    id: 'trial',
    question: 'Can I try Pro before I pay?',
    answer:
      'Yes. Every workspace gets 14 days of Pro with no card needed. When the trial ends you pick a plan or stay on Free.',
  },
  {
    id: 'seats',
    question: 'Who counts as a person?',
    answer:
      'Anyone who can edit in your workspace. People you share a read-only link with are always free.',
  },
  {
    id: 'switch',
    question: 'Can I switch between monthly and yearly?',
    answer:
      'Any time, from your workspace settings. A move to yearly starts right away, and we credit what is left of the month.',
  },
  {
    id: 'downgrade',
    question: 'What happens to my notes if I downgrade?',
    answer:
      'Nothing is deleted. Notes over the Free limit become read-only until you upgrade again or archive a few.',
  },
  {
    id: 'export',
    question: 'Can I take my notes with me?',
    answer:
      'Always. Export a workspace as Markdown files on any plan, whenever you like.',
  },
];

const FOOTER_LINKS = ['Privacy', 'Terms', 'Status', 'Contact'];

const linkClass = cn(
  textVariants({ variant: 'caption' }),
  'rounded-xs transition-colors duration-(--duration-fast) hover:text-ink',
  focusRing,
  touchTarget,
);

function SiteHeader() {
  return (
    <header className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:px-8">
      <a
        href="#home"
        className={cn(
          'flex items-center gap-2 justify-self-start rounded-xs',
          focusRing,
        )}
      >
        <Feather aria-hidden className="size-5" />
        <Text as="span" variant="headline">
          Driftnote
        </Text>
      </a>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {LINKS.map(link => (
            <NavigationMenuItem key={link}>
              <NavigationMenuLink
                href={`#${link.toLowerCase()}`}
                active={link === 'Pricing'}
                className={navigationMenuItemClass}
              >
                {link}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-1 justify-self-end">
        <Button variant="plain" asChild>
          <a href="#sign-in">Sign in</a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="plain"
              tone="neutral"
              icon
              aria-label="Menu"
              className="md:hidden"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LINKS.map(link => (
              <DropdownMenuItem key={link} asChild>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <Card variant={plan.featured ? 'accent' : 'surface'} className="gap-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{plan.name}</CardTitle>
          {plan.featured && <Badge tone="accent">Most popular</Badge>}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <Text as="p" variant="title-1" numeric>
            ${plan.price[billing]}
          </Text>
          <Text variant="caption">{plan.caption}</Text>
        </div>
        <Text variant="caption">{plan.note[billing]}</Text>
      </div>
      <ul className="flex flex-col gap-2.5">
        {plan.features.map(feature => (
          <li
            key={feature}
            className={cn(textVariants({ variant: 'subhead' }), 'flex gap-2')}
          >
            <Check
              aria-hidden
              className="h-[1lh] w-4 shrink-0 text-ink-secondary"
            />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.featured ? 'filled' : 'tinted'}
        className="mt-auto w-full"
      >
        {plan.cta}
      </Button>
    </Card>
  );
}

export function PricingPage() {
  return (
    <div className="min-h-dvh bg-canvas">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-12 pt-10 md:gap-16 md:px-8 md:pb-16 md:pt-16">
        <section className="flex flex-col gap-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
            <Text variant="display">
              Pricing that <Mark>stays simple</Mark> as your team grows
            </Text>
            <Text tone="secondary" className="mx-auto max-w-xl">
              Start free with your own notes. Move to Pro when your team joins
              in, and change plans or cancel whenever you like.
            </Text>
          </div>
          <Tabs defaultValue="monthly">
            <div className="flex justify-center">
              <TabsList
                aria-label="Billing period"
                className="inline-grid grid-cols-2"
              >
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge tone="accent">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            {BILLING.map(billing => (
              <TabsContent
                key={billing}
                value={billing}
                className="mt-8 grid gap-4 md:grid-cols-3"
              >
                {PLANS.map(plan => (
                  <PlanCard key={plan.name} plan={plan} billing={billing} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>
        <section
          aria-labelledby="pricing-faq"
          className="grid gap-6 md:grid-cols-3 md:gap-8"
        >
          <div className="flex flex-col gap-2">
            <Text id="pricing-faq" variant="title-2">
              Questions, answered
            </Text>
            <Text variant="subhead" tone="secondary">
              Something else on your mind? Write to{' '}
              <Button variant="link" asChild>
                <a href="mailto:help@example.com">help@example.com</a>
              </Button>
              .
            </Text>
          </div>
          <Card className="py-1 md:col-span-2">
            <Accordion type="single" collapsible defaultValue="trial">
              {QUESTIONS.map(item => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>
        <Card className="gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <CardHeader>
            <CardTitle as="h2">Teaching or running a nonprofit?</CardTitle>
            <CardDescription>
              Pro is free for schools and half price for registered nonprofits.
            </CardDescription>
          </CardHeader>
          <Button variant="tinted" className="self-start sm:self-auto">
            Apply for a discount
          </Button>
        </Card>
      </main>
      <footer className="mx-auto w-full max-w-5xl px-4 md:px-8">
        <Separator />
        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="caption">© 2026 Driftnote, an example company</Text>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {FOOTER_LINKS.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className={linkClass}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

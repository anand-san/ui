import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { useState } from 'react';

import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { Calendar } from '@/design-system/components/DatePicker/Calendar';
import { DatePicker } from '@/design-system/components/DatePicker/DatePicker';
import { Field } from '@/design-system/components/Field/Field';
import { Label } from '@/design-system/components/Label/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/Select/Select';
import { Switch } from '@/design-system/components/Switch/Switch';

import { Input } from './Input';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Forms',
  parameters: {
    docs: {
      description: {
        component:
          'Text controls share one look and the Button heights (sm 32px, md 36px, lg 40px), so a field and a button on the same row line up. Wrap each control in a `Field`: it renders the label, the hint or error, and links them to the control (`htmlFor`, `aria-describedby`, `aria-invalid`, `aria-required`). Use `Label` on its own only beside a Checkbox or Switch.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fields: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Field label="Project name" required>
        <Input placeholder="e.g. Website redesign" />
      </Field>
      <Field label="Owner email" required error="Owner email is required">
        <Input />
      </Field>
      <Field label="Description" hint="Shown to everyone in the workspace.">
        <Textarea placeholder="What is this project about?" />
      </Field>
      <Field label="Region">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="nl">Netherlands</SelectItem>
            <SelectItem value="us">United States</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Search projects"
          placeholder="Search projects..."
          className="pl-9"
        />
      </div>
    </div>
  ),
};

function LabelActionDemo() {
  const [summary, setSummary] = useState('');
  return (
    <div className="max-w-md">
      <Field
        label="Summary"
        labelAction={
          <span className="text-xs tabular-nums text-muted-foreground">
            {summary.length}/300
          </span>
        }
        hint="Two or three sentences about what you do best."
      >
        <Textarea
          value={summary}
          maxLength={300}
          onChange={event => setSummary(event.target.value)}
        />
      </Field>
    </div>
  );
}

export const WithLabelAction: Story = {
  name: 'With a label action',
  render: () => <LabelActionDemo />,
};

export const DenseEditor: Story = {
  name: 'Dense editor (sm)',
  parameters: {
    docs: {
      description: {
        story:
          '`size="sm"` is for dense panels, like a form inside a list of entries: a small muted label and 32px controls. The controls pick up the size from the Field.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 rounded-xl bg-surface p-3">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Milestone" size="sm">
          <Input placeholder="e.g. Beta launch" />
        </Field>
        <Field label="Owner" size="sm">
          <Input placeholder="e.g. Ada" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Start date" size="sm">
          <Input placeholder="YYYY-MM" />
        </Field>
        <Field label="End date" size="sm">
          <Input placeholder="YYYY-MM" disabled />
        </Field>
      </div>
      <Field
        label="Spacer height (px)"
        size="sm"
        hint="Min: 4px, Max: 96px, Default: 16px."
      >
        <Input type="number" placeholder="e.g. 16" />
      </Field>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Input size="sm" placeholder="Small, 32px" />
      <Input placeholder="Medium, 36px (default)" />
      <Input size="lg" placeholder="Large, 40px" />
    </div>
  ),
};

function SelectionDemo() {
  const [date, setDate] = useState<string>();
  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field label="Pay period">
        <Select defaultValue="year">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hour">Per hour</SelectItem>
            <SelectItem value="month">Per month</SelectItem>
            <SelectItem value="year">Per year</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <DatePicker label="Start date" required value={date} onChange={setDate} />
      <DatePicker
        label="End date"
        error="End date must be after the start date"
      />
      <div className="flex items-center gap-2">
        <Checkbox id="notify" defaultChecked />
        <Label htmlFor="notify">Notify the team when it changes</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="updates" defaultChecked />
        <Label htmlFor="updates">Send me updates</Label>
      </div>
    </div>
  );
}

export const Selection: Story = {
  render: () => <SelectionDemo />,
};

export const CalendarStory: Story = {
  name: 'Calendar',
  parameters: {
    docs: {
      description: {
        story:
          'The calendar inside `DatePicker`, for when a date has to be picked inline.',
      },
    },
  },
  render: () => (
    <div className="w-fit rounded-xl border bg-popover">
      <Calendar
        mode="single"
        selected={new Date(2026, 9, 16)}
        defaultMonth={new Date(2026, 9, 1)}
      />
    </div>
  ),
};

export const OnASoftCard: Story = {
  name: 'On a soft card',
  render: () => (
    <div className="max-w-md rounded-xl bg-surface p-6">
      <Field label="Job title">
        <Input placeholder="Fields stay white on the surface token" />
      </Field>
    </div>
  ),
};

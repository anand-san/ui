import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { Calendar } from '@/design-system/components/DatePicker/Calendar';
import { DatePicker } from '@/design-system/components/DatePicker/DatePicker';
import { Field } from '@/design-system/components/Field/Field';
import { Label } from '@/design-system/components/Label/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
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
          "A Field wires a label, one control and its hint or error together. Controls share heights, corners and the focus ring with Button, and follow the density; text is never below 16px on a touch screen, so iOS doesn't zoom. Select opens over its trigger with the chosen item in place, like a desktop pop-up button.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectForm() {
  const [due, setDue] = useState<string>();
  return (
    <form
      className="flex max-w-md flex-col gap-5 rounded-card bg-surface p-inset"
      onSubmit={event => event.preventDefault()}
    >
      <Field label="Project name" required hint="Shown to everyone on the team">
        <Input placeholder="Website redesign" />
      </Field>
      <Field
        label="Owner email"
        error="Enter an email address, like ada@example.com"
      >
        <Input type="email" defaultValue="ada@" />
      </Field>
      <Field label="Status">
        <Select defaultValue="planned">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <DatePicker label="Due" value={due} onChange={setDue} />
      <Field label="Goal" hint="Two or three sentences">
        <Textarea placeholder="What does done look like?" />
      </Field>
      <div className="flex justify-end gap-2">
        <Button variant="tinted" tone="neutral">
          Cancel
        </Button>
        <Button type="submit">Create project</Button>
      </div>
    </form>
  );
}

export const Fields: Story = {
  render: () => (
    <div className="rounded-sheet bg-canvas p-4">
      <ProjectForm />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex gap-2">
          <Input size={size} placeholder={`Search (${size})`} />
          <Button size={size}>Search</Button>
        </div>
      ))}
    </div>
  ),
};

export const ChoiceControls: Story = {
  name: 'Checkboxes and switches',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Email me about new features</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="partial" checked="indeterminate" />
        <Label htmlFor="partial">Some projects selected</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="off" disabled />
        <Label htmlFor="off">Unavailable</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="sync" defaultChecked />
        <Label htmlFor="sync">Sync over cellular</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="beta" />
        <Label htmlFor="beta">Try beta features</Label>
      </div>
    </div>
  ),
};

export const Selection: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <Field label="Time zone">
        <Select defaultValue="cet">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">London</SelectItem>
              <SelectItem value="cet">Berlin</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Americas</SelectLabel>
              <SelectItem value="est">New York</SelectItem>
              <SelectItem value="pst">San Francisco</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Below the trigger" hint='SelectContent position="popper"'>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a size" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="s">Small</SelectItem>
            <SelectItem value="m">Medium</SelectItem>
            <SelectItem value="l">Large</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  ),
};

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="w-fit rounded-card bg-surface">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}

export const CalendarStory: Story = {
  name: 'Calendar',
  render: () => <CalendarDemo />,
};

export const Birthday: Story = {
  name: 'Date far from today',
  render: () => (
    <div className="max-w-xs">
      <DatePicker
        label="Birthday"
        captionLayout="dropdown"
        minDate={new Date(1920, 0, 1)}
        maxDate={new Date()}
      />
    </div>
  ),
};

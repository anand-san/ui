import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/design-system/components/AlertDialog/AlertDialog';
import { Button } from '@/design-system/components/Button/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/Popover/Popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/design-system/components/Sheet/Sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/design-system/components/Tooltip/Tooltip';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const meta = {
  title: 'Components/Overlays',
  parameters: {
    docs: {
      description: {
        component:
          'Behavior-heavy components wrap Radix primitives for focus handling, keyboard support and positioning; screens import them from `@/design-system`. Floating panels share one look: a rounded-xl popover surface with a border and shadow. Dialogs slide up as a bottom sheet on phones.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogStory: Story = {
  name: 'Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project details</DialogTitle>
          <DialogDescription>
            Changes are saved to your workspace.
          </DialogDescription>
        </DialogHeader>
        <Field label="Name">
          <Input defaultValue="Website redesign" />
        </Field>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmDelete: Story = {
  name: 'Alert dialog',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All of its tasks are deleted too.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Menu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" shape="pill" aria-label="Actions">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel>Project</DropdownMenuLabel>
        <DropdownMenuItem>
          <Pencil />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function SelectionMenuDemo() {
  const [status, setStatus] = useState('in-progress');
  const [showClosed, setShowClosed] = useState(false);
  const [showArchived, setShowArchived] = useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Board options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>Move to</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="planned">Planned</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="in-progress">
            In progress
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showClosed}
          onCheckedChange={setShowClosed}
        >
          Show closed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showArchived}
          onCheckedChange={setShowArchived}
        >
          Show archived
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Last updated</DropdownMenuItem>
            <DropdownMenuItem>Name</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const SelectionMenu: Story = {
  name: 'Menu with choices',
  parameters: {
    docs: {
      description: {
        story:
          'Radio items for one choice (the status picker), checkbox items for toggles and a submenu for rarely used options.',
      },
    },
  },
  render: () => <SelectionMenuDemo />,
};

export const PopoverAndTooltip: Story = {
  name: 'Popover and tooltip',
  render: () => (
    <TooltipProvider>
      <div className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Hidden columns</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="text-sm">
            Closed, Archived. Change this from the board menu.
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltips use the primary color</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const SheetStory: Story = {
  name: 'Sheet',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Report defaults</Button>
      </SheetTrigger>
      <SheetContent showClose>
        <SheetHeader>
          <SheetTitle>Report defaults</SheetTitle>
          <SheetDescription>Used when creating a new report.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

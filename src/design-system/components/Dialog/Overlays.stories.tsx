import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Copy,
  Ellipsis,
  Info,
  Pencil,
  Share,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
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
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import { List, ListItem } from '@/design-system/components/List/List';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/Popover/Popover';
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
import { Text } from '@/design-system/components/Text/Text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/design-system/components/Tooltip/Tooltip';

import {
  Dialog,
  DialogClose,
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
          'Dialogs and sheets move on springs: they keep their content mounted through the exit, so closing animates too and can be interrupted. On phones a Dialog is a bottom sheet you can drag down to close. Menus, popovers and tooltips are translucent panels that grow from their trigger. Radix handles focus, Escape and outside clicks.',
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
        <Button>Rename project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Everyone on the project sees the new name.
          </DialogDescription>
        </DialogHeader>
        <Field label="Name">
          <Input defaultValue="Website redesign" />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="tinted" tone="neutral">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmDelete: Story = {
  name: 'AlertDialog',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="tinted" tone="danger">
          <Trash2 />
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “Website redesign”?</AlertDialogTitle>
          <AlertDialogDescription>
            Its 24 tasks and files go too. This can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction tone="danger">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

function SheetDemo({ side }: { side: 'bottom' | 'right' | 'left' }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="tinted">
          <SlidersHorizontal />
          {side === 'bottom' ? 'Bottom sheet' : `From the ${side}`}
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            {side === 'bottom'
              ? 'Drag the grabber or the title down to close.'
              : 'Narrow the list to what you need.'}
          </SheetDescription>
        </SheetHeader>
        <List className="bg-surface-inset">
          <ListItem
            title="Only mine"
            trailing={<Switch aria-label="Only mine" />}
          />
          <ListItem
            title="Include archived"
            trailing={<Switch aria-label="Include archived" />}
          />
        </List>
        <SheetFooter>
          <Button>Show 24 results</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const SheetStory: Story = {
  name: 'Sheet',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SheetDemo side="bottom" />
      <SheetDemo side="right" />
      <SheetDemo side="left" />
    </div>
  ),
};

function MenuDemo() {
  const [sort, setSort] = useState('updated');
  const [showDone, setShowDone] = useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tinted" tone="neutral" icon aria-label="Actions">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Pencil />
          Rename
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Email</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="updated">
            Last updated
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showDone}
          onCheckedChange={value => setShowDone(value === true)}
        >
          Show finished
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Menu: Story = {
  render: () => <MenuDemo />,
};

export const PopoverAndTooltip: Story = {
  name: 'Popover and Tooltip',
  render: () => (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="tinted">Details</Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1">
          <Text variant="headline">Website redesign</Text>
          <Text variant="subhead" tone="secondary">
            Updated 2 hours ago by Grace. 6 people, due 28 November.
          </Text>
        </PopoverContent>
      </Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="plain" tone="neutral" icon aria-label="About">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>About this project</TooltipContent>
      </Tooltip>
    </div>
  ),
};

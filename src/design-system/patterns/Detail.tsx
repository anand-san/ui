import {
  Archive,
  BookOpen,
  ChevronLeft,
  Copy,
  Download,
  Ellipsis,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  type LucideIcon,
  Pencil,
  Trash2,
  Upload,
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
} from '@/design-system/components/AlertDialog/AlertDialog';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { DatePicker } from '@/design-system/components/DatePicker/DatePicker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/design-system/components/Dialog/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import {
  List,
  ListItem,
  ListSection,
} from '@/design-system/components/List/List';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { Progress } from '@/design-system/components/Progress/Progress';
import {
  type StatusOption,
  StatusMenu,
} from '@/design-system/components/StatusMenu/StatusMenu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/design-system/components/Tabs/Tabs';
import { Mark } from '@/design-system/components/Text/Mark';
import { Text } from '@/design-system/components/Text/Text';

type Status = 'Planned' | 'In progress' | 'In review' | 'Done';

const statuses: StatusOption<Status>[] = [
  { value: 'Planned', tone: 'neutral' },
  { value: 'In progress', tone: 'info' },
  { value: 'In review', tone: 'warning' },
  { value: 'Done', tone: 'success' },
];

interface Project {
  name: string;
  due: string;
}

interface Milestone {
  id: string;
  title: string;
  due: string;
  done: boolean;
}

interface Activity {
  id: string;
  who: string;
  what: string;
  detail?: string;
  when: string;
}

const me = 'Ada Lovelace';

const team = [
  'Ada Lovelace',
  'Grace Hopper',
  'Alan Turing',
  'Katherine Johnson',
  'Margaret Hamilton',
];

const initialMilestones: Milestone[] = [
  { id: 'audit', title: 'Site audit', due: '19 September', done: true },
  { id: 'wireframes', title: 'Wireframes', due: '10 October', done: true },
  { id: 'visual', title: 'Visual design', due: '24 October', done: true },
  {
    id: 'build',
    title: 'Homepage and pricing',
    due: '14 November',
    done: false,
  },
  {
    id: 'content',
    title: 'Content migration',
    due: '21 November',
    done: false,
  },
  { id: 'launch', title: 'Launch', due: '28 November', done: false },
];

const initialActivity: Activity[] = [
  {
    id: 'comment',
    who: 'Katherine Johnson',
    what: 'commented',
    detail: '“The pricing table needs a yearly toggle before we ship.”',
    when: 'Today at 10:24',
  },
  {
    id: 'upload',
    who: 'Alan Turing',
    what: 'added pricing-page.pdf',
    when: 'Today at 09:12',
  },
  {
    id: 'visual',
    who: 'Grace Hopper',
    what: 'completed “Visual design”',
    when: 'Yesterday at 16:40',
  },
  {
    id: 'status',
    who: 'Grace Hopper',
    what: 'moved this to In progress',
    when: '4 November',
  },
  {
    id: 'joined',
    who: 'Margaret Hamilton',
    what: 'joined the project',
    when: '2 November',
  },
  {
    id: 'created',
    who: 'Ada Lovelace',
    what: 'created the project',
    when: '2 September',
  },
];

const files: {
  name: string;
  icon: LucideIcon;
  size: string;
  by: string;
  date: string;
}[] = [
  {
    name: 'pricing-page.pdf',
    icon: FileText,
    size: '3.2 MB',
    by: 'Alan Turing',
    date: 'Today',
  },
  {
    name: 'homepage-hero.png',
    icon: FileImage,
    size: '1.8 MB',
    by: 'Grace Hopper',
    date: '6 Nov',
  },
  {
    name: 'launch-checklist.xlsx',
    icon: FileSpreadsheet,
    size: '96 KB',
    by: 'Margaret Hamilton',
    date: '3 Nov',
  },
  {
    name: 'wireframes.pdf',
    icon: FileText,
    size: '8.1 MB',
    by: 'Grace Hopper',
    date: '10 Oct',
  },
  {
    name: 'brand-photos.zip',
    icon: FileArchive,
    size: '64 MB',
    by: 'Katherine Johnson',
    date: '22 Sep',
  },
];

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function EditProjectForm({
  project,
  onSave,
}: {
  project: Project;
  onSave: (project: Project) => void;
}) {
  const [name, setName] = useState(project.name);
  const [due, setDue] = useState<string | undefined>(project.due);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={event => {
        event.preventDefault();
        onSave({ name: name.trim(), due: due ?? project.due });
      }}
    >
      <Field label="Name" id="project-name" required>
        <Input value={name} onChange={event => setName(event.target.value)} />
      </Field>
      <Field label="Due date" id="project-due">
        <DatePicker value={due} onChange={setDue} />
      </Field>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="tinted" tone="neutral">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!name.trim()}>
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export function DetailScreen() {
  const [project, setProject] = useState<Project>({
    name: 'Website redesign',
    due: '2026-11-28T00:00:00.000Z',
  });
  const [status, setStatus] = useState<Status>('In progress');
  const [milestones, setMilestones] = useState(initialMilestones);
  const [activity, setActivity] = useState(initialActivity);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const done = milestones.filter(milestone => milestone.done).length;

  const log = (what: string) =>
    setActivity(items => [
      { id: `new-${items.length}`, who: me, what, when: 'Just now' },
      ...items,
    ]);

  const changeStatus = (next: Status) => {
    setStatus(next);
    log(`moved this to ${next}`);
  };

  const toggleMilestone = (milestone: Milestone, checked: boolean) => {
    setMilestones(items =>
      items.map(item =>
        item.id === milestone.id ? { ...item, done: checked } : item,
      ),
    );
    log(`${checked ? 'completed' : 'reopened'} “${milestone.title}”`);
  };

  return (
    <div className="min-h-dvh bg-canvas">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <PageHeader
          eyebrow={
            <Button variant="link" asChild>
              <a href="#projects">
                <ChevronLeft />
                Projects
              </a>
            </Button>
          }
          title={project.name}
          description="A faster, clearer example.com for the spring launch."
          actions={
            <>
              <StatusMenu
                value={status}
                options={statuses}
                onValueChange={changeStatus}
                size="md"
              />
              <Button variant="tinted" tone="neutral">
                Share
              </Button>
              <Button onClick={() => setEditing(true)}>Edit</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="tinted"
                    tone="neutral"
                    icon
                    aria-label="More actions"
                  >
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setEditing(true)}>
                    <Pencil />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    tone="danger"
                    onSelect={() => setDeleting(true)}
                  >
                    <Trash2 />
                    Delete project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        />

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <Tabs defaultValue="overview" className="min-w-0 lg:col-span-2">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brief</CardTitle>
                  <CardDescription>
                    Updated 3 days ago by Ada Lovelace
                  </CardDescription>
                </CardHeader>
                <Text className="text-pretty">
                  Rebuild example.com on the new design system, starting with
                  the homepage and pricing. Every page should{' '}
                  <Mark>load in under a second</Mark> on a phone, and the copy
                  stays as it is until the content review.
                </Text>
              </Card>

              <Card className="gap-3 p-0 pt-inset">
                <CardHeader className="px-inset">
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>
                    {done} of {milestones.length} done
                  </CardDescription>
                  <CardAction>
                    <Text as="span" variant="title-3" numeric>
                      {Math.round((done / milestones.length) * 100)}%
                    </Text>
                  </CardAction>
                </CardHeader>
                <div className="px-inset pb-1">
                  <Progress
                    value={done}
                    max={milestones.length}
                    tone={done === milestones.length ? 'success' : 'accent'}
                    label="Milestones done"
                  />
                </div>
                <List className="rounded-t-none">
                  {milestones.map(milestone => (
                    <ListItem
                      key={milestone.id}
                      trailing={
                        <Checkbox
                          checked={milestone.done}
                          onCheckedChange={checked =>
                            toggleMilestone(milestone, checked === true)
                          }
                          aria-label={milestone.title}
                        />
                      }
                      title={
                        <Text
                          as="span"
                          tone={milestone.done ? 'secondary' : undefined}
                        >
                          {milestone.title}
                        </Text>
                      }
                      description={`Due ${milestone.due}`}
                    />
                  ))}
                </List>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <List>
                {activity.map(item => (
                  <ListItem
                    key={item.id}
                    leading={<Avatar name={item.who} />}
                    title={
                      <>
                        <Text as="span" variant="headline">
                          {item.who}
                        </Text>{' '}
                        {item.what}
                      </>
                    }
                    description={item.detail}
                  >
                    <Text as="span" variant="caption">
                      {item.when}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </TabsContent>

            <TabsContent value="files" className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 pl-inset">
                <Text variant="subhead" tone="secondary">
                  {files.length} files
                </Text>
                <Button variant="tinted" size="sm">
                  <Upload />
                  Upload
                </Button>
              </div>
              <List>
                {files.map(file => (
                  <ListItem
                    key={file.name}
                    leading={<file.icon />}
                    title={file.name}
                    description={`${file.by} · ${file.date}`}
                    trailing={
                      <span className="flex items-center gap-3">
                        <Text
                          as="span"
                          variant="subhead"
                          tone="secondary"
                          numeric
                        >
                          {file.size}
                        </Text>
                        <Button
                          variant="plain"
                          tone="neutral"
                          size="sm"
                          icon
                          aria-label={`Download ${file.name}`}
                        >
                          <Download />
                        </Button>
                      </span>
                    }
                  />
                ))}
              </List>
            </TabsContent>
          </Tabs>

          <aside className="flex flex-col gap-6">
            <ListSection
              title="Details"
              footer="Created 2 September by Ada Lovelace."
            >
              <List>
                <ListItem
                  title="Owner"
                  trailing={
                    <span className="flex items-center gap-2">
                      <Avatar name={me} size="sm" />
                      {me}
                    </span>
                  }
                />
                <ListItem
                  title="Due date"
                  trailing={dateFormat.format(new Date(project.due))}
                />
                <ListItem
                  title="Priority"
                  trailing={<Badge tone="warning">High</Badge>}
                />
                <ListItem
                  title="Team"
                  trailing={
                    <span className="flex -space-x-1">
                      {team.map(name => (
                        <Avatar
                          key={name}
                          name={name}
                          size="sm"
                          className="ring-2 ring-surface"
                        />
                      ))}
                    </span>
                  }
                />
              </List>
            </ListSection>

            <ListSection title="Linked">
              <List>
                <ListItem
                  leading={<BookOpen />}
                  title="Brand guidelines"
                  description="Document"
                  chevron
                  asChild
                >
                  <a href="#brand-guidelines" />
                </ListItem>
                <ListItem
                  leading={<FolderKanban />}
                  title="Pricing page"
                  trailing={<StatusMenu value="Planned" options={statuses} />}
                  chevron
                  asChild
                >
                  <a href="#pricing-page" />
                </ListItem>
                <ListItem
                  leading={<FolderKanban />}
                  title="Docs site"
                  trailing={<StatusMenu value="In review" options={statuses} />}
                  chevron
                  asChild
                >
                  <a href="#docs-site" />
                </ListItem>
              </List>
            </ListSection>
          </aside>
        </div>
      </div>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent close={false}>
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>
              Everyone on the project sees the changes.
            </DialogDescription>
          </DialogHeader>
          <EditProjectForm
            project={project}
            onSave={next => {
              setProject(next);
              setEditing(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleting} onOpenChange={setDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{project.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Its {milestones.length} milestones and {files.length} files go
              too. This can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction tone="danger">Delete project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

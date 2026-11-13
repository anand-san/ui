import {
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  Link2,
  MessageSquare,
} from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/design-system/components/Alert/Alert';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { DatePicker } from '@/design-system/components/DatePicker/DatePicker';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import { Textarea } from '@/design-system/components/Input/Textarea';
import { Label } from '@/design-system/components/Label/Label';
import {
  List,
  ListItem,
  ListSection,
} from '@/design-system/components/List/List';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/Select/Select';
import { Switch } from '@/design-system/components/Switch/Switch';
import { Text } from '@/design-system/components/Text/Text';

interface ProjectValues {
  name: string;
  description: string;
  category: string;
  start: string | undefined;
  due: string | undefined;
  owner: string;
  notify: string[];
  linkAccess: boolean;
  comments: boolean;
}

type ProjectField = 'name' | 'due';

interface Problem {
  field: ProjectField;
  message: string;
}

const fieldIds: Record<ProjectField, string> = {
  name: 'project-name',
  due: 'project-due',
};

const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'alan', name: 'Alan Turing' },
  { id: 'katherine', name: 'Katherine Johnson' },
  { id: 'margaret', name: 'Margaret Hamilton' },
];

const categories = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'research', label: 'Research' },
  { value: 'operations', label: 'Operations' },
];

const descriptionLimit = 280;

const blank: ProjectValues = {
  name: '',
  description: '',
  category: '',
  start: '2026-11-16T00:00:00.000Z',
  due: undefined,
  owner: 'ada',
  notify: ['grace', 'alan'],
  linkAccess: false,
  comments: true,
};

const rejected: ProjectValues = {
  ...blank,
  description: 'A calmer home page, and a checkout that works on phones.',
  category: 'design',
  due: '2026-11-09T00:00:00.000Z',
};

function validate(values: ProjectValues) {
  const problems: Problem[] = [];
  if (!values.name.trim()) {
    problems.push({ field: 'name', message: 'Enter a name for the project' });
  }
  if (values.start && values.due && values.due < values.start) {
    problems.push({
      field: 'due',
      message: 'Pick a due date on or after the start date',
    });
  }
  return problems;
}

export interface CreateFormScreenProps {
  failedSubmit?: boolean;
}

export function CreateFormScreen({
  failedSubmit = false,
}: CreateFormScreenProps) {
  const [values, setValues] = useState(failedSubmit ? rejected : blank);
  const [submitted, setSubmitted] = useState(failedSubmit);
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const problems = submitted ? validate(values) : [];
  const errorFor = (field: ProjectField) =>
    problems.find(problem => problem.field === field)?.message;

  useEffect(() => {
    if (feedbackCount > 0) feedbackRef.current?.focus();
  }, [feedbackCount]);

  useEffect(() => {
    if (!saving) return;
    const timer = setTimeout(() => {
      setSaving(false);
      setCreated(true);
      setFeedbackCount(count => count + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [saving]);

  function update<K extends keyof ProjectValues>(
    key: K,
    value: ProjectValues[K],
  ) {
    setValues(current => ({ ...current, [key]: value }));
    setCreated(false);
  }

  function toggleNotify(id: string, checked: boolean) {
    update(
      'notify',
      checked
        ? [...values.notify, id]
        : values.notify.filter(person => person !== id),
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setCreated(false);
    if (validate(values).length > 0) {
      setFeedbackCount(count => count + 1);
      return;
    }
    setSaving(true);
  }

  return (
    <div className="min-h-dvh bg-canvas">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <PageHeader
          eyebrow={
            <Button variant="link" asChild>
              <a href="#projects">
                <ChevronLeft />
                Projects
              </a>
            </Button>
          }
          title="New project"
          description="Set up the basics now. You can change any of it later in the project's settings."
        />
        <form noValidate onSubmit={submit} className="flex flex-col gap-6">
          {problems.length > 0 && (
            <Alert
              ref={feedbackRef}
              tabIndex={-1}
              tone="danger"
              className="outline-none"
            >
              <CircleAlert />
              <AlertTitle>The project wasn&apos;t created</AlertTitle>
              <AlertDescription>
                <ul className="flex flex-col gap-1">
                  {problems.map(problem => (
                    <li key={problem.field}>
                      <Button
                        variant="link"
                        tone="danger"
                        className="text-left whitespace-normal"
                        onClick={() =>
                          document
                            .getElementById(fieldIds[problem.field])
                            ?.focus()
                        }
                      >
                        {problem.message}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {created && (
            <Alert
              ref={feedbackRef}
              tabIndex={-1}
              tone="success"
              className="outline-none"
            >
              <CircleCheck />
              <AlertTitle>Project created</AlertTitle>
              <AlertDescription>
                {values.name.trim()} is ready, and everyone you picked has a
                link to it.
              </AlertDescription>
            </Alert>
          )}
          <ListSection title="Details">
            <Card>
              <Field
                label="Name"
                id={fieldIds.name}
                required
                error={errorFor('name')}
              >
                <Input
                  value={values.name}
                  onChange={event => update('name', event.target.value)}
                  placeholder="Website redesign"
                  autoComplete="off"
                />
              </Field>
              <Field
                label="Description"
                id="project-description"
                hint="A sentence or two on what done looks like."
                labelAction={
                  <Text variant="caption" numeric>
                    {values.description.length}/{descriptionLimit}
                  </Text>
                }
              >
                <Textarea
                  value={values.description}
                  onChange={event => update('description', event.target.value)}
                  maxLength={descriptionLimit}
                  placeholder="What are you making, and for whom?"
                />
              </Field>
              <Field label="Category" id="project-category">
                <Select
                  value={values.category}
                  onValueChange={value => update('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </Card>
          </ListSection>
          <ListSection
            title="Schedule"
            footer="The due date shows on everyone's calendar."
          >
            <Card className="grid gap-4 sm:grid-cols-2">
              <Field label="Start date" id="project-start">
                <DatePicker
                  value={values.start}
                  onChange={date => update('start', date)}
                />
              </Field>
              <Field label="Due date" id={fieldIds.due} error={errorFor('due')}>
                <DatePicker
                  value={values.due}
                  onChange={date => update('due', date)}
                  placeholder="No due date"
                />
              </Field>
            </Card>
          </ListSection>
          <ListSection
            title="Team"
            footer="Everyone you pick gets one email with a link to the project."
          >
            <Card>
              <Field
                label="Owner"
                id="project-owner"
                hint="The owner gets the reminders and can archive the project."
              >
                <Select
                  value={values.owner}
                  onValueChange={value => update('owner', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {people.map(person => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <fieldset className="flex min-w-0 flex-col gap-1.5">
                <Text as="legend" variant="subhead" className="font-medium">
                  Send a link to
                </Text>
                <div className="flex flex-col">
                  {people
                    .filter(person => person.id !== values.owner)
                    .map(person => (
                      <div
                        key={person.id}
                        className="flex min-h-control-md items-center gap-3"
                      >
                        <Checkbox
                          id={`notify-${person.id}`}
                          checked={values.notify.includes(person.id)}
                          onCheckedChange={checked =>
                            toggleNotify(person.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={`notify-${person.id}`}
                          className="flex min-w-0 items-center gap-2"
                        >
                          <Avatar name={person.name} size="sm" />
                          {person.name}
                        </Label>
                      </div>
                    ))}
                </div>
              </fieldset>
            </Card>
          </ListSection>
          <ListSection
            title="Visibility"
            footer="Only the team can edit, whatever you choose here."
          >
            <List>
              <ListItem
                leading={<Link2 />}
                title="Anyone with the link can view"
                description="No account needed"
                trailing={
                  <Switch
                    checked={values.linkAccess}
                    onCheckedChange={checked => update('linkAccess', checked)}
                    aria-label="Anyone with the link can view"
                  />
                }
              />
              <ListItem
                leading={<MessageSquare />}
                title="Allow comments"
                description="Viewers can comment on tasks"
                trailing={
                  <Switch
                    checked={values.comments}
                    onCheckedChange={checked => update('comments', checked)}
                    aria-label="Allow comments"
                  />
                }
              />
            </List>
          </ListSection>
          <div className="flex justify-end gap-2">
            <Button variant="plain" tone="neutral" asChild>
              <a href="#projects">Cancel</a>
            </Button>
            <Button type="submit" loading={saving}>
              Create project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

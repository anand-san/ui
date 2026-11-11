import {
  Copy,
  Ellipsis,
  Search,
  SearchX,
  Send,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react';
import { useRef, useState } from 'react';

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
import { Card } from '@/design-system/components/Card/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { EmptyState } from '@/design-system/components/EmptyState/EmptyState';
import { Input } from '@/design-system/components/Input/Input';
import { List, ListItem } from '@/design-system/components/List/List';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/Select/Select';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/design-system/components/Tabs/Tabs';
import { Text } from '@/design-system/components/Text/Text';

const roles = ['Admin', 'Editor', 'Viewer'] as const;

export type MemberRole = (typeof roles)[number];
export type MemberStatus = 'active' | 'invited';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  sent?: string;
}

type RoleFilter = 'all' | MemberRole;

const isRole = (value: string): value is MemberRole =>
  roles.some(role => role === value);

const sampleMembers: readonly Member[] = [
  {
    id: 'ada',
    name: 'Ada Lovelace',
    email: 'ada.lovelace@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 'grace',
    name: 'Grace Hopper',
    email: 'grace.hopper@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 'alan',
    name: 'Alan Turing',
    email: 'alan.turing@example.com',
    role: 'Editor',
    status: 'active',
  },
  {
    id: 'katherine',
    name: 'Katherine Johnson',
    email: 'katherine.johnson@research.example.com',
    role: 'Editor',
    status: 'active',
  },
  {
    id: 'margaret',
    name: 'Margaret Hamilton',
    email: 'margaret.hamilton@flight-software.example.com',
    role: 'Editor',
    status: 'active',
  },
  {
    id: 'edsger',
    name: 'Edsger Dijkstra',
    email: 'edsger.dijkstra@example.com',
    role: 'Viewer',
    status: 'active',
  },
  {
    id: 'donald',
    name: 'Donald Knuth',
    email: 'donald.knuth@example.com',
    role: 'Viewer',
    status: 'active',
  },
  {
    id: 'barbara',
    name: 'Barbara Liskov',
    email: 'barbara.liskov@example.com',
    role: 'Editor',
    status: 'invited',
    sent: 'Sent 2 days ago',
  },
  {
    id: 'radia',
    name: 'Radia Perlman',
    email: 'radia.perlman@example.com',
    role: 'Viewer',
    status: 'invited',
    sent: 'Sent 5 days ago',
  },
  {
    id: 'frances',
    name: 'Frances Allen',
    email: 'frances.allen@example.com',
    role: 'Admin',
    status: 'invited',
    sent: 'Sent yesterday',
  },
];

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;

export interface SearchAndFilterScreenProps {
  members?: readonly Member[];
  loading?: boolean;
}

export function SearchAndFilterScreen({
  members: initialMembers = sampleMembers,
  loading = false,
}: SearchAndFilterScreenProps) {
  const [members, setMembers] = useState<Member[]>(() => [...initialMembers]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<RoleFilter>('all');
  const [status, setStatus] = useState<MemberStatus>('active');
  const [pending, setPending] = useState<Member | null>(null);
  const [confirming, setConfirming] = useState(false);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const searchBox = useRef<HTMLInputElement>(null);

  const empty = !loading && members.length === 0;
  const term = query.trim().toLowerCase();
  const filtering = term !== '' || role !== 'all';
  const inTab = members.filter(member => member.status === status);
  const shown = inTab.filter(
    member =>
      (role === 'all' || member.role === role) &&
      (term === '' ||
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term)),
  );
  const total =
    status === 'active'
      ? plural(inTab.length, 'member', 'members')
      : plural(inTab.length, 'invite', 'invites');
  const count = filtering ? `${shown.length} of ${total}` : total;

  const update = (id: string, change: Partial<Member>) =>
    setMembers(current =>
      current.map(member =>
        member.id === id ? { ...member, ...change } : member,
      ),
    );

  const clearFilters = () => {
    setQuery('');
    setRole('all');
    searchBox.current?.focus();
  };

  const askToRemove = (member: Member) => {
    setPending(member);
    setConfirming(true);
  };

  const remove = () => {
    if (pending) {
      setMembers(current => current.filter(member => member.id !== pending.id));
    }
  };

  const invite = (
    <Button>
      <UserPlus />
      Invite people
    </Button>
  );

  const results = loading ? (
    <>
      <Text variant="caption" role="status" className="px-inset">
        Loading members…
      </Text>
      <List aria-busy>
        {Array.from({ length: 5 }, (_, index) => (
          <ListItem
            key={index}
            leading={<Skeleton className="size-8 rounded-full" />}
            title={<Skeleton className="my-0.5 h-4 w-36 max-w-full" />}
            description={<Skeleton className="my-0.5 h-3 w-52 max-w-full" />}
            trailing={<Skeleton className="h-5 w-14 rounded-full" />}
          />
        ))}
      </List>
    </>
  ) : (
    <>
      <Text variant="caption" role="status" className="px-inset">
        {count}
      </Text>
      {shown.length > 0 ? (
        <List>
          {shown.map(member => (
            <ListItem
              key={member.id}
              leading={<Avatar name={member.name} />}
              title={
                <Text as="span" variant="headline" truncate className="block">
                  {member.name}
                </Text>
              }
              description={
                <span className="block truncate">{member.email}</span>
              }
              trailing={
                <span className="flex items-center gap-3">
                  <Badge tone={member.role === 'Admin' ? 'accent' : 'neutral'}>
                    {member.role}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        ref={node => {
                          if (node) triggers.current.set(member.id, node);
                          return () => {
                            triggers.current.delete(member.id);
                          };
                        }}
                        variant="plain"
                        tone="neutral"
                        size="sm"
                        icon
                        aria-label={`Actions for ${member.name}`}
                      >
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <UserCog />
                          Change role
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup
                            value={member.role}
                            onValueChange={value => {
                              if (isRole(value)) {
                                update(member.id, { role: value });
                              }
                            }}
                          >
                            {roles.map(option => (
                              <DropdownMenuRadioItem
                                key={option}
                                value={option}
                              >
                                {option}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      {member.status === 'invited' ? (
                        <DropdownMenuItem
                          onSelect={() =>
                            update(member.id, { sent: 'Sent just now' })
                          }
                        >
                          <Send />
                          Resend invite
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onSelect={() => {
                            navigator.clipboard
                              .writeText(member.email)
                              .catch(() => undefined);
                          }}
                        >
                          <Copy />
                          Copy email
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        tone="danger"
                        onSelect={() => askToRemove(member)}
                      >
                        <UserMinus />
                        {member.status === 'invited'
                          ? 'Revoke invite'
                          : 'Remove'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              }
            >
              {member.sent && (
                <Text as="span" variant="caption">
                  {member.sent}
                </Text>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Card>
          {filtering ? (
            <EmptyState
              icon={<SearchX />}
              title={
                term
                  ? `No one matches “${query.trim()}”`
                  : 'No one has this role'
              }
              description="Try another name or email, or clear the filters."
              action={
                <Button variant="tinted" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<Users />}
              title={
                status === 'invited'
                  ? 'No pending invites'
                  : 'No active members'
              }
              description={
                status === 'invited'
                  ? 'Invites you send wait here until they are accepted.'
                  : 'People show up here once they accept an invite.'
              }
            />
          )}
        </Card>
      )}
    </>
  );

  return (
    <div className="min-h-dvh bg-canvas">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <PageHeader
          title="Members"
          description="Everyone in the workspace, and the people you have invited."
          actions={empty ? undefined : invite}
        />
        {empty ? (
          <Card>
            <EmptyState
              size="lg"
              icon={<Users />}
              title="No members yet"
              description="Invite people by email. They show up here with their role once they accept."
              action={invite}
            />
          </Card>
        ) : (
          <Tabs
            value={status}
            onValueChange={value =>
              setStatus(value === 'invited' ? 'invited' : 'active')
            }
            className="flex flex-col gap-4"
          >
            <div
              role="search"
              aria-label="Members"
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-control-md items-center justify-center text-ink-secondary">
                  <Search aria-hidden className="size-4" />
                </span>
                <Input
                  ref={searchBox}
                  type="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Search by name or email"
                  aria-label="Search members"
                  className="pl-control-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <Select
                  value={role}
                  onValueChange={value =>
                    setRole(isRole(value) ? value : 'all')
                  }
                >
                  <SelectTrigger
                    aria-label="Role"
                    className="flex-1 sm:w-36 sm:flex-none"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    {roles.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="invited">Invited</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="active" className="mt-0 flex flex-col gap-2">
              {results}
            </TabsContent>
            <TabsContent value="invited" className="mt-0 flex flex-col gap-2">
              {results}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent
          onCloseAutoFocus={event => {
            const trigger = pending && triggers.current.get(pending.id);
            if (trigger?.isConnected) {
              event.preventDefault();
              trigger.focus();
            } else if (searchBox.current) {
              event.preventDefault();
              searchBox.current.focus();
            }
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending?.status === 'invited'
                ? `Revoke the invite for ${pending.name}?`
                : `Remove ${pending?.name ?? 'this member'}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.status === 'invited'
                ? 'The link in their email stops working. You can invite them again later.'
                : 'They lose access to every project in the workspace. You can invite them again later.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction tone="danger" onClick={remove}>
              {pending?.status === 'invited' ? 'Revoke invite' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { CircleAlert, KeyRound, Layers } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/design-system/components/Alert/Alert';
import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import { Label } from '@/design-system/components/Label/Label';
import { Separator } from '@/design-system/components/Separator/Separator';
import { Text } from '@/design-system/components/Text/Text';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SignInScreenProps {
  wrongPassword?: boolean;
}

export function SignInScreen({ wrongPassword = false }: SignInScreenProps) {
  const [email, setEmail] = useState(wrongPassword ? 'ada@example.com' : '');
  const [password, setPassword] = useState(wrongPassword ? 'analytical' : '');
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [retried, setRetried] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const failed = wrongPassword && !retried;

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    const nextEmailError = !address
      ? 'Enter your email address'
      : emailPattern.test(address)
        ? undefined
        : 'Enter an email address, like ada@example.com';
    const nextPasswordError = password ? undefined : 'Enter your password';
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setRetried(true);
    if (nextEmailError) {
      emailRef.current?.focus();
    } else if (nextPasswordError) {
      passwordRef.current?.focus();
    } else {
      setLoading(true);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Layers aria-hidden className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="title-1">Sign in</Text>
              <Text tone="secondary">
                Welcome back. Pick up where you left off.
              </Text>
            </div>
          </div>
          {failed && (
            <Alert tone="danger">
              <CircleAlert />
              <AlertTitle>Couldn&apos;t sign you in</AlertTitle>
              <AlertDescription>
                After 2 more tries, sign-in pauses for 15&nbsp;minutes to keep
                your account safe.
              </AlertDescription>
            </Alert>
          )}
          <Card>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <Field label="Email" id="sign-in-email" error={emailError}>
                <Input
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="username webauthn"
                  placeholder="you@example.com"
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value);
                    setEmailError(undefined);
                  }}
                />
              </Field>
              <Field
                label="Password"
                id="sign-in-password"
                error={
                  passwordError ??
                  (failed ? "That password isn't right" : undefined)
                }
                labelAction={
                  <Button variant="link" className="text-subhead" asChild>
                    <a href="#reset-password">Forgot password?</a>
                  </Button>
                }
              >
                <Input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                    setPasswordError(undefined);
                  }}
                />
              </Field>
              <div className="flex items-center gap-2.5">
                <Checkbox id="sign-in-remember" name="remember" />
                <Label htmlFor="sign-in-remember">Keep me signed in</Label>
              </div>
              <Button type="submit" loading={loading} className="w-full">
                Sign in
              </Button>
            </form>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <Text as="span" variant="caption">
                or
              </Text>
              <Separator className="flex-1" />
            </div>
            <Button variant="tinted" tone="neutral" className="w-full">
              <KeyRound />
              Continue with a passkey
            </Button>
          </Card>
          <Text variant="subhead" tone="secondary" className="text-center">
            New here?{' '}
            <Button variant="link" asChild>
              <a href="#create-account">Create an account</a>
            </Button>
          </Text>
        </div>
      </main>
      <footer className="flex justify-center px-4 pb-8">
        <Text
          as="nav"
          variant="caption"
          aria-label="Legal"
          className="flex h-4 items-center gap-3"
        >
          <Button
            variant="link"
            tone="neutral"
            className="text-ink-secondary"
            asChild
          >
            <a href="#terms">Terms</a>
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="link"
            tone="neutral"
            className="text-ink-secondary"
            asChild
          >
            <a href="#privacy">Privacy</a>
          </Button>
        </Text>
      </footer>
    </div>
  );
}

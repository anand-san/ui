import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { Input } from '@/design-system/components/Input/Input';
import { Textarea } from '@/design-system/components/Input/Textarea';

import { Field } from './Field';

function parse(html: string) {
  const attr = (tag: string, name: string) =>
    html.match(new RegExp(`<${tag}[^>]*\\s${name}="([^"]*)"`))?.[1];
  return { attr };
}

describe('Field', () => {
  test('links the label to the control by id', () => {
    const { attr } = parse(
      renderToStaticMarkup(
        <Field label="Job title" id="job-title">
          <Input />
        </Field>,
      ),
    );
    expect(attr('label', 'for')).toBe('job-title');
    expect(attr('input', 'id')).toBe('job-title');
  });

  test('generates an id when none is given', () => {
    const { attr } = parse(
      renderToStaticMarkup(
        <Field label="Job title">
          <Input />
        </Field>,
      ),
    );
    expect(attr('input', 'id')).toBeTruthy();
    expect(attr('label', 'for')).toBe(attr('input', 'id'));
  });

  test('marks the control invalid and describes it with the error', () => {
    const html = renderToStaticMarkup(
      <Field label="Company" id="company" error="Company is required">
        <Input />
      </Field>,
    );
    const { attr } = parse(html);
    expect(attr('input', 'aria-invalid')).toBe('true');
    expect(attr('input', 'aria-describedby')).toBe('company-message');
    expect(attr('p', 'id')).toBe('company-message');
    expect(attr('p', 'role')).toBe('alert');
    expect(html).toContain('Company is required');
  });

  test('shows the hint without marking the control invalid', () => {
    const html = renderToStaticMarkup(
      <Field label="Summary" id="summary" hint="Two or three sentences">
        <Textarea />
      </Field>,
    );
    const { attr } = parse(html);
    expect(attr('textarea', 'aria-invalid')).toBeUndefined();
    expect(attr('textarea', 'aria-describedby')).toBe('summary-message');
    expect(html).toContain('Two or three sentences');
  });

  test('hides the hint while there is an error', () => {
    const html = renderToStaticMarkup(
      <Field label="Summary" hint="A hint" error="Too long">
        <Textarea />
      </Field>,
    );
    expect(html).not.toContain('A hint');
    expect(html).toContain('Too long');
  });

  test('required adds an asterisk and aria-required', () => {
    const html = renderToStaticMarkup(
      <Field label="Job title" required>
        <Input />
      </Field>,
    );
    expect(parse(html).attr('input', 'aria-required')).toBe('true');
    expect(html).toContain(' *');
  });

  test('sm size passes the control size down', () => {
    const html = renderToStaticMarkup(
      <Field label="Position" size="sm">
        <Input />
      </Field>,
    );
    expect(parse(html).attr('input', 'class')).toContain('h-8');
  });

  test('props on the control win over the field', () => {
    const { attr } = parse(
      renderToStaticMarkup(
        <Field label="Position" size="sm" id="from-field">
          <Input id="own-id" size="lg" />
        </Field>,
      ),
    );
    expect(attr('input', 'id')).toBe('own-id');
    expect(attr('input', 'class')).toContain('h-10');
  });

  test('a control outside a Field is unchanged', () => {
    const { attr } = parse(renderToStaticMarkup(<Input />));
    expect(attr('input', 'id')).toBeUndefined();
    expect(attr('input', 'aria-invalid')).toBeUndefined();
  });
});

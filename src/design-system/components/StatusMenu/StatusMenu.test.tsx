import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { StatusMenu, type StatusOption } from './StatusMenu';

const options: StatusOption[] = [
  { value: 'todo', label: 'To do', tone: 'neutral' },
  { value: 'done', label: 'Done', tone: 'success' },
  { value: 'late', className: 'bg-late/10 text-late' },
];

describe('StatusMenu', () => {
  test('is a plain badge without onValueChange', () => {
    const html = renderToStaticMarkup(
      <StatusMenu value="done" options={options} />,
    );
    expect(html).not.toContain('<button');
    expect(html).toContain('Done');
    expect(html).toContain('text-success');
  });

  test('is a labelled button with onValueChange', () => {
    const html = renderToStaticMarkup(
      <StatusMenu
        value="todo"
        options={options}
        label="Task status"
        onValueChange={() => {}}
      />,
    );
    expect(html).toContain('<button');
    expect(html).toContain(
      'aria-label="Task status: To do. Change task status"',
    );
  });

  test("uses the option's own colors instead of a tone", () => {
    const html = renderToStaticMarkup(
      <StatusMenu value="late" options={options} />,
    );
    expect(html).toContain('text-late');
    expect(html).toContain('>late<');
  });
});

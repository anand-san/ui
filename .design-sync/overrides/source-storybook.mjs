// forked from design-sync lib/source-storybook.mjs - one card per component
// for san-ui's grouped story files.
//
// Several story files cover a family of components under one title
// (Components/Forms, Overlays, Feedback, Navigation, Layout), so the stock
// adapter would emit a single card per file and leave Select, DropdownMenu,
// Sheet and the rest without their own types and usage doc. This wraps the
// bundled adapter instead of copying it: discovery and story pairing run
// unchanged, then each story is regrouped under the component(s) it demos.
// A story can feed several cards when it is the real demo of each (Forms >
// Selection shows Select, DatePicker, Checkbox, Switch and Label).
//
// Adding a story to a grouped file: give its id an entry below, or the build
// warns and the story lands under the group title, which matches no export
// and is dropped as [TITLE_UNMAPPED].
export { bundlePreviewDecorators } from '../../.ds-sync/lib/source-storybook.mjs';
import { resolveStorybook as resolveBase } from '../../.ds-sync/lib/source-storybook.mjs';

const STORY_COMPONENTS = {
  'components-feedback--alerts': ['Alert'],
  'components-feedback--progress-and-scores': ['Progress', 'ScoreRing'],
  'components-feedback--loading-and-empty': ['Skeleton'],
  'components-feedback--toasts': ['Toaster'],
  'components-forms--fields': ['Field', 'Input', 'Textarea'],
  'components-forms--with-label-action': ['Field'],
  'components-forms--dense-editor': ['Field'],
  'components-forms--sizes': ['Input'],
  'components-forms--selection': ['Select', 'DatePicker', 'Checkbox', 'Switch', 'Label'],
  'components-forms--calendar-story': ['Calendar'],
  'components-forms--on-a-soft-card': ['Field'],
  'components-layout--separator-story': ['Separator'],
  'components-layout--scroll-area-story': ['ScrollArea'],
  'components-navigation--tabs-story': ['Tabs'],
  'components-navigation--overflowing-tabs': ['Tabs'],
  'components-navigation--accordion-story': ['Accordion'],
  'components-navigation--header-navigation': ['NavigationMenu'],
  'components-overlays--dialog-story': ['Dialog'],
  'components-overlays--confirm-delete': ['AlertDialog'],
  'components-overlays--menu': ['DropdownMenu'],
  'components-overlays--selection-menu': ['DropdownMenu'],
  'components-overlays--popover-and-tooltip': ['Popover', 'Tooltip'],
  'components-overlays--sheet-story': ['Sheet'],
  'components-text--highlighter': ['Text', 'Mark'],
};

// Pane groups, following the families in src/design-system/README.md
const COMPONENT_GROUPS = {
  Button: 'actions',
  Avatar: 'display', Badge: 'display', StatusMenu: 'display',
  Text: 'typography', Mark: 'typography',
  Card: 'layout', PageHeader: 'layout', Separator: 'layout', ScrollArea: 'layout',
  Alert: 'feedback', EmptyState: 'feedback', Progress: 'feedback', ScoreRing: 'feedback',
  Skeleton: 'feedback', Toaster: 'feedback',
  Field: 'forms', Input: 'forms', Textarea: 'forms', Select: 'forms', DatePicker: 'forms',
  Calendar: 'forms', Checkbox: 'forms', Switch: 'forms', Label: 'forms',
  Tabs: 'navigation', Accordion: 'navigation', NavigationMenu: 'navigation',
  Dialog: 'overlays', AlertDialog: 'overlays', DropdownMenu: 'overlays', Popover: 'overlays',
  Tooltip: 'overlays', Sheet: 'overlays',
};

const GROUPED_TITLES = new Set(['Feedback', 'Forms', 'Layout', 'Navigation', 'Overlays']);

export async function resolveStorybook(ctx) {
  const result = await resolveBase(ctx);
  const byName = new Map();
  for (const c of result.components) {
    for (const s of c.storyIds ?? []) {
      const names = STORY_COMPONENTS[s.id] ?? [c.name];
      if (!STORY_COMPONENTS[s.id] && GROUPED_TITLES.has(c.name)) {
        console.error(`  ! story ${s.id} is in a grouped file but has no entry in .design-sync/overrides/source-storybook.mjs — add one`);
      }
      for (const name of names) {
        if (!byName.has(name)) {
          byName.set(name, { ...c, name, group: COMPONENT_GROUPS[name] ?? c.group, storyIds: [], importPaths: new Set() });
        }
        const target = byName.get(name);
        target.storyIds.push({ ...s });
        if (s.importPath) target.importPaths.add(s.importPath);
      }
    }
  }
  result.components = [...byName.values()];
  console.error(`  [OVERRIDE] stories regrouped → ${result.components.length} components`);
  return result;
}

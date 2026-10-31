/**
 * Blog posts. Each post is a list of blocks; paragraphs and list items
 * support `inline code` between backticks.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'quote'; text: string }

export type Post = {
  slug: string
  title: string
  description: string
  date: string // ISO date
  readMinutes: number
  tags: string[]
  /** A project slug this post is about; the case study links back to it. */
  project?: string
  blocks: Block[]
}

export const posts: Post[] = [
  {
    slug: 'loveping-off-nativewind',
    title: 'How I moved Loveping off NativeWind without changing how it looks',
    description:
      'Loveping’s styling kept breaking in ways nobody noticed. Here is how I moved 715 className usages across 91 files to plain React Native StyleSheet, one file at a time, while the app kept shipping.',
    date: '2026-10-30',
    readMinutes: 7,
    tags: ['React Native', 'Expo', 'Migration'],
    project: 'loveping',
    blocks: [
      {
        type: 'p',
        text: 'I built Loveping from the first commit, and I was the only engineer on it from start to finish. It’s an app for couples: love notes, call reminders and gift nudges. For version 1 I styled everything with NativeWind, which lets you write Tailwind classes in React Native. It was a good choice for getting started. I could move fast, and the screens matched the designs.',
      },
      {
        type: 'p',
        text: 'As the app grew, the styling became the source of most of my bugs. This is the story of how I replaced it without users noticing anything, except that things stopped breaking.',
      },
      { type: 'h2', text: 'The problem: mistakes that failed quietly' },
      {
        type: 'p',
        text: 'When I audited the app, I found that a lot of the styling didn’t do what the code said. A class name is just a string, so a mistake doesn’t throw an error. It simply does nothing. Some of what I found:',
      },
      {
        type: 'ul',
        items: [
          'Typos like `ext-xs` and `mmin-h-30` that had been silently ignored for months.',
          '`bg-danger-1a` on the logout button, when the colour in the config was named `1A`. The button had no background at all.',
          'Over 100 uses of Inter font classes, but the fonts were never loaded. The whole app was rendering in the system font.',
          'Web-only classes like `w-fit` and `whitespace-nowrap` that React Native ignores, so elements stretched in ways nobody intended.',
          'A floating tab bar that left a visible strip when hidden, jumped sideways between tabs and covered content on phones with a home indicator.',
        ],
      },
      {
        type: 'p',
        text: 'None of these showed up as errors. They showed up as “it looks a bit off on my phone” reports that were hard to pin down. Every fix felt like a patch on a patch.',
      },
      { type: 'h2', text: 'Migrate, don’t rewrite' },
      {
        type: 'p',
        text: 'The numbers were big: 715 `className` usages across 91 files, with 312 different class names and 50 class strings built on the fly. It was tempting to start a fresh “version 2” project. But the routes, API calls and state stores had no styling in them, and they worked. Rewriting them would have added risk for nothing.',
      },
      {
        type: 'p',
        text: 'So I planned version 2 as a styling migration, not a rewrite. NativeWind and StyleSheet can live side by side in the same app, which meant I could move one file at a time while the app kept running and shipping.',
      },
      {
        type: 'p',
        text: 'Before touching any code, I took screenshots of every screen. Those became the definition of “unchanged”. Every migrated screen had to match its screenshot.',
      },
      { type: 'h2', text: 'Step 1: copy the design tokens exactly' },
      {
        type: 'p',
        text: 'The Tailwind config was the only record of the app’s real design values, and they weren’t Tailwind’s defaults. In Loveping, `rounded-md` meant 10 pixels and `rounded-2xl` meant 35. A quick “translate the class names” approach would have changed the look everywhere. So the first thing I wrote was a token module, copied value by value from the old config:',
      },
      {
        type: 'code',
        lang: 'ts',
        caption: 'src/theme/radii.ts',
        code: `/**
 * The project's own scale from the old tailwind.config.js,
 * not Tailwind's defaults.
 */
export const radii = {
  sm: 4,
  base: 5, // \`rounded\`
  md: 10,
  lg: 20,
  xl: 28,
  "2xl": 35,
  "3xl": 50,
  full: 9999,
} as const;`,
      },
      {
        type: 'p',
        text: 'Colours, spacing and text sizes got the same treatment. Text sizes kept the line heights Tailwind had paired with them, so `text-sm` stayed 14 on 20.',
      },
      { type: 'h2', text: 'Step 2: keep the breakpoint' },
      {
        type: 'p',
        text: 'NativeWind’s `sm:` prefix applied extra styles on phones at least 375 points wide. Most iPhones got the `sm` styles; common 360dp Android phones didn’t. I didn’t want to change that behaviour by accident, so I wrote a tiny helper that keeps the same split:',
      },
      {
        type: 'code',
        lang: 'ts',
        caption: 'src/theme/responsive.ts',
        code: `export const SM_BREAKPOINT = 375;

export const useResponsive = () => {
  const { width } = useWindowDimensions();
  return { isSm: width >= SM_BREAKPOINT, width };
};

/** Pick the base or sm value: rs(isSm, 16, 24) */
export const rs = <T,>(isSm: boolean, base: T, sm: T): T =>
  isSm ? sm : base;`,
      },
      { type: 'h2', text: 'Step 3: shared styles instead of a line-by-line translation' },
      {
        type: 'p',
        text: 'The same class combinations appeared again and again. The card style alone, `bg-white-08 border border-primary-14 rounded-md`, was everywhere. Instead of translating each one, I turned the repeats into shared styles:',
      },
      {
        type: 'code',
        lang: 'tsx',
        caption: 'Before and after',
        code: `// Before (version 1)
<View className="bg-white-08 border border-primary-14 rounded-md p-4">

// After (version 2)
<View style={[layout.surface, styles.card]}>

// src/theme/index.ts
export const layout = StyleSheet.create({
  surface: {
    backgroundColor: WHITE_08,
    borderWidth: 1,
    borderColor: PRIMARY_14,
    borderRadius: radii.md,
  },
});`,
      },
      {
        type: 'p',
        text: 'This removed a lot of repeated style code, and it fixed small inconsistencies where one card had drifted slightly from the others. Now a typo in a style name is a TypeScript error, not a silent bug.',
      },
      { type: 'h2', text: 'Step 4: fix the tab bar properly' },
      {
        type: 'p',
        text: 'The floating tab bar had been patched many times. This time I worked out its real size on each device and put that in one place. Every screen that scrolls under the bar now uses the same number for its bottom padding:',
      },
      {
        type: 'code',
        lang: 'ts',
        caption: 'src/components/tabBarMetrics.ts',
        code: `export const useTabBarMetrics = () => {
  const insets = useSafeAreaInsets();
  const { isSm } = useResponsive();
  const paddingVertical = rs(isSm, space[3], space[4]);
  const height = TAB_SIZE + paddingVertical * 2 + 2;
  const bottom = insets.bottom > 0 ? insets.bottom : MIN_BOTTOM_GAP;
  return { height, bottom, space: height + bottom };
};`,
      },
      {
        type: 'p',
        text: 'I checked it on five screen sizes, from a 320dp Android phone to an iPad. The bar now hides fully, keeps a fixed width and never covers content.',
      },
      { type: 'h2', text: 'Step 5: one rule for commits' },
      {
        type: 'p',
        text: 'The audit also turned up real bugs that weren’t about styling, like a search that didn’t search and a share button that only copied. I fixed them, but never in the same commit as a styling change. Styling commits weren’t allowed to change behaviour. If something broke, I could tell straight away whether it was a styling problem or a logic problem.',
      },
      {
        type: 'p',
        text: 'While I was in each file, I also added 44-point touch targets and screen-reader labels to buttons. That change is invisible to most users, but it makes the app usable for people who rely on accessibility features.',
      },
      { type: 'h2', text: 'Removing NativeWind last' },
      {
        type: 'p',
        text: 'NativeWind stayed installed until the very end, so screens I hadn’t reached yet kept working. Once the last file was moved, I removed it and checked that `npm ls react-native-css-interop` returned nothing. Today there isn’t a single `className` left in the app.',
      },
      { type: 'h2', text: 'What I’d tell someone thinking about this' },
      {
        type: 'ul',
        items: [
          'NativeWind isn’t the villain. It’s great for moving fast. The real problem was that mistakes failed quietly, and I didn’t have a way to catch them.',
          'Audit before you plan. I only knew the fonts weren’t loading because I went looking.',
          'Copy your design tokens exactly before you migrate anything. Your config isn’t the defaults, even if it looks like it.',
          'Migrate in place, one file at a time. The app should be shippable after every commit.',
          'Keep styling changes and behaviour changes in separate commits.',
        ],
      },
      {
        type: 'p',
        text: 'There was one deliberate visual change: version 2 loads Inter properly, so the app finally uses the font it was designed with. Everything else looks the same as version 1. It just doesn’t break.',
      },
    ],
  },
]

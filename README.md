# Port of shadcn/ui without Radix Depedency or any other UI library

This repository contains a port of the `shadcn/ui` library, a collection of UI components for web applications. The port is designed to have zero external UI dependencies and utilizes Tailwind CSS for styling. I added some minor additions and improvements like an affirmative variant and a Link component.

# Demo

A live demo can be found [here](https://nice-sky-059595e10.4.azurestaticapps.net)

![Global Showcase GIF](https://github.com/WailAbou/shadcn-svelte-nodep/raw/main/assets/gifs/showcase.gif)

![Settings Showcase GIF](https://github.com/WailAbou/shadcn-svelte-nodep/raw/main/assets/gifs/settings.gif)

## Components

Here is a list of components that have been ported from `shadcn/ui`. Each component is marked with a checkmark if it has been successfully implemented:

| Component       | Status |
| --------------- | ------ |
| Accordion       |   ✅   |
| Alert           |   ✅   |
| Alert Dialog    |   ✅   |
| Aspect Ratio    |   ✅   |
| Avatar          |   ✅   |
| Badge           |   ✅   |
| Breadcrumb      |   ✅   |
| Button          |   ✅   |
| Calendar        |   ❌   |
| Card            |   ✅   |
| Carousel        |   ❌   |
| Chart           |   ❌   |
| Checkbox        |   ✅   |
| Collapsible     |   ✅   |
| Combobox        |   ❌   |
| Command         |   ❌   |
| Context Menu    |   ❌   |
| Data Table      |   ❌   |
| Date Picker     |   ❌   |
| Dialog          |   ✅   |
| Drawer          |   ❌   |
| Dropdown Menu   |   ❌   |
| Form            |   ❌   |
| Hover Card      |   ✅   |
| Input           |   ✅   |
| Input OTP       |   ✅   |
| Label           |   ✅   |
| Link            |   ✅   |
| Menubar         |   ❌   |
| Navigation Menu |   ❌   |
| Pagination      |   ✅   |
| Popover         |   ✅   |
| Progress        |   ✅   |
| Radio Group     |   ✅   |
| Resizable       |   ❌   |
| Scroll Area     |   ✅   |
| Select          |   ✅   |
| Separator       |   ✅   |
| Sheet           |   ✅   |
| Sidebar         |   ❌   |
| Skeleton        |   ✅   |
| Slider          |   ✅   |
| Sonner          |   ❌   |
| Switch          |   ✅   |
| Table           |   ❌   |
| Tabs            |   ✅   |
| Textarea        |   ✅   |
| Toast           |   ❌   |
| Toggle          |   ✅   |
| Toggle Group    |   ✅   |
| Tooltip         |   ✅   |

## Usage

Make sure to refer to the original `shadcn/ui` documentation for detailed usage instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Special Thanks

I want to extend my gratitude to the following individuals and projects for their valuable contributions to this port:

- **Duder-onomy** for their excellent work on [svelte-focus-trap](https://github.com/Duder-onomy/svelte-focus-trap/blob/master/src/utils.js).

- **SkeletonLabs Team** for their genius implementation of [FocusTrap](https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/actions/FocusTrap/focusTrap.ts) in the Skeleton framework.

- **shadcn** for their fantastic [shadcn/ui](https://github.com/shadcn-ui/ui) library, which inspired this project.

- **huntabyte** for their port of shadcn/ui with Radix Dependency, which served as an excellent reference. Check out their work [here](https://github.com/huntabyte/shadcn-svelte).

I am grateful for their contributions, which helped make this project possible.

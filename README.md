# Noun Site

A feature complete customizable template for Nouns Builder DAOs built with

- [NextJS](https://nextjs.org/) (base framework)
- [TailwindCSS](https://tailwindcss.com/) (css / theming)
- [wagmi](https://wagmi.sh/) (writing to contracts)
- [RainbowKit](https://www.rainbowkit.com/) (wallet connection)
- [BuilderSDK](https://github.com/neokry/builder-sdk) (reading contract data)

**Demo Sites**

- [builder.nounsite.wtf](https://builder.nounsite.wtf/)
- [purple.nounsite.wtf](https://builder.nounsite.wtf/)
- [assembly.nounsite.wtf](https://builder.nounsite.wtf/)

## Step 1: Create your DAO

Head to the [Nouns Builder](https://nouns.build/) website to deploy your DAO

## Step 2. Clone and deploy with Vercel

Click the '▲ Deploy' button below to clone your own version of the template.

You will be prompted to fill a few variables as part of the deployment process.

### Required Variables

`NEXT_PUBLIC_ALCHEMY_KEY` can be found by creating a new project in [Alchemy](https://dashboard.alchemyapi.io/) and then grabbing the API KEY from the project dashboard page and clicking the 'Get Key' button.

`NEXT_PUBLIC_TOKEN_CONTRACT` can be found on your [Nouns Builder](https://nouns.build/) page

### Optional Variables

`NEXT_PUBLIC_IPFS_GATEWAY` change the default gateway for IPFS content.

`NEXT_PUBLIC_TOKEN_NETWORK` change the network you want to pull token data from set to `5` for Goerli testnet.

### Deploy

Deploy your template using the deploy link below

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneokry%2Fnoun-site&env=NEXT_PUBLIC_ALCHEMY_KEY,NEXT_PUBLIC_TOKEN_CONTRACT)

# Local Development

First, install dependencies with yarn

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Editing site content

You can start editing the markdown templates in `/templates` to change your sites content and add custom pages.
We use [frontmatter](https://www.npmjs.com/package/front-matter) to parse template configs at the top of each markdown page

- `templates/:page.md`: Create simple custom pages by making new markdown files directly in the `templates` folder.
  - Set the config `align` to `center` for center aligned content.
- `templates/home/description.md`: The main description that appears on your site right under the auction hero.
- `templates/home/faq/:faq-entry.md`: Create new markdown files in the faq folder to add new entries to the FAQ section on the homepage.
  - Set the `title` config to change the FAQs title and `order` to change the entries order within the list.
- `templates/vote/description.md`: The description located at the top of the voting page.

## Theming

Customize your site colors, branding, navigation and strings via `theme.config.ts`

```javascript
ThemeConfig = {
  styles: {
    colors?: ThemeColors;
    fonts?: ThemeFonts;
    logoHeight?: string;
  };
  strings: {
    currentBid?: string;
    auctionEndsIn?: string;
    placeBid?: string;
    highestBidder?: string;
    connectWallet?: string;
    wrongNetwork?: string;
  };
  brand: {
    logo?: string | null;
    title?: string | null;
  };
  nav: {
    primary: NavigationItem[];
    secondary: NavigationItem[];
  };
}

ThemeColors = {
  fill?: RGBType;
  muted?: RGBType;
  stroke?: RGBType;
  backdrop?: RGBType;
  "text-base"?: RGBType;
  "text-muted"?: RGBType;
  "text-inverted"?: RGBType;
  "text-highlighted"?: RGBType;
  "button-accent"?: RGBType;
  "button-accent-hover"?: RGBType;
  "button-muted"?: RGBType;
  "proposal-success"?: RGBType;
  "proposal-danger"?: RGBType;
  "proposal-muted"?: RGBType;
  "proposal-highlighted"?: RGBType;
}

ThemeFonts = {
  heading?: string;
  body?: string;
}

NavigationItem = {
  label: string;
  href: string;
}

RGBType = `${string}, ${string}, ${string}`
```

### Defualt Themes

Quickly get started with our two default themes `lightTheme` or `darkTheme`

```javascript
import { lightTheme } from "theme/default";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Roboto",
    },
    colors: {
      "text-highlighted": "0, 133, 255",
    },
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
    ],
  },
} as Partial<ThemeConfig>);
```

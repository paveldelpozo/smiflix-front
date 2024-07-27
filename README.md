# SmiFlix

Netflix like catalog using Smile and Learn Youtube channels.

Created by Pavel del Pozo ([yosoy@paveldelpozo.es](mailto:yosoy@paveldelpozo.es))

## Installation Steps

1. Clone this repo:
    ```bash
    git clone git@github.com:paveldelpozo/smiflix-front.git
    ```
   Or:
    ```bash
    git clone https://github.com/paveldelpozo/smiflix-front.git
    ```

2. Create into root folder `.env` file with next code:
    ```dotenv
    NUXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyBg5EyQC89WC_Njek45OR8D-TQWasksU3Y
    NUXT_PUBLIC_CHANNEL_ID_ES=UCCZpm6436NiU__lcBAlEZmQ
    NUXT_PUBLIC_CHANNEL_ID_EN=UCxoDMG0tvaYO5Xobvtqw5nw
    ```
3. Install dependencies:
    ```bash
    # npm
    npm install
    
    # pnpm
    pnpm install
    
    # yarn
    yarn install
    
    # bun
    bun install
    ```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

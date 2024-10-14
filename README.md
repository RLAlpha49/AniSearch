# AniSearch

AniSearch is a web application built with Next.js that allows users to search for anime and manga using a description-based search. The models/embedding usable were generated using [AniSearchModel](https://github.com/RLAlpha49/AniSearchModel).

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with AniSearch, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/RLAlpha49/AniSearch.git
    cd AniSearch
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Anime and Manga Search: Search for anime and manga using various models.
- Dark Mode: Toggle between light and dark themes.
- Model Selection: Choose from a list of models for search.
- Settings Dialog: Customize search settings, including results per page and default model.

## Project Structure

```text
AniSearch/
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorDisplay.tsx
│   │   │   ├── LoadingIndicator.tsx
│   │   │   └── SettingsDialog.tsx
│   │   ├── layout/
│   │   │   ├── DarkModeToggle.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MultiSelect.tsx
│   │   ├── results/
│   │   │   ├── AnimeCard.tsx
│   │   │   ├── FilterOptions.tsx
│   │   │   ├── LoadMoreButton.tsx
│   │   │   ├── MangaCard.tsx
│   │   │   └── ResultsList.tsx
│   │   ├── search/
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   └── SearchTypeSwitch.tsx
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── command.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── slider.tsx
│   │   │   └── switch.tsx
│   │   └── AniSearch.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       ├── props/
│       │   ├── AnimeCard.ts
│       │   ├── DarkModeToggle.ts
│       │   ├── ErrorDisplay.ts
│       │   ├── FilterOptions.ts
│       │   ├── Header.ts
│       │   ├── InfoItem.ts
│       │   ├── LoadingIndicator.ts
│       │   ├── LoadMoreButton.ts
│       │   ├── MangaCard.ts
│       │   ├── ModelSelector.ts
│       │   ├── ResultsList.ts
│       │   ├── SearchInput.ts
│       │   ├── SearchTypeSwitch.ts
│       │   └── SettingsDialog.ts
│       ├── Anime.ts
│       ├── Filters.ts
│       ├── Manga.ts
│       └── Settings.ts
├── .cursorignore
├── .eslintrc.json
├── .gitignore
├── components.json
├── LICENSE
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

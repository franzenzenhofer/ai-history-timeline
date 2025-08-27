# AI History Timeline

A comprehensive, interactive timeline tracking the evolution of artificial intelligence from 1950 to present day.

## 🌐 Live Sites
- Production: [https://ai-history-3n1.pages.dev](https://ai-history-3n1.pages.dev)
- Custom Domain: `aihistory.franzai.com` (pending DNS configuration)

## 🚀 Features

- **Modular Architecture**: TypeScript-based modular design with separation of concerns
- **Data-Driven**: All timeline events stored in JSON for easy updates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Sticky navigation with smooth scrolling
- **Visual Timeline**: Beautiful timeline visualization with animated scroll effects
- **Up-to-Date**: Includes latest 2025 AI developments including multimodal convergence

## 📁 Project Structure

```
ai-history-timeline/
├── src/
│   ├── data/
│   │   └── timeline.json       # Timeline events data
│   ├── modules/
│   │   ├── data-loader.ts     # Data loading and caching
│   │   ├── navigation.ts      # Navigation component
│   │   └── timeline-renderer.ts # Timeline rendering logic
│   ├── styles/
│   │   ├── variables.css      # CSS custom properties
│   │   ├── base.css          # Base styles
│   │   ├── navigation.css    # Navigation styles
│   │   └── timeline.css      # Timeline component styles
│   ├── types/
│   │   └── timeline.ts       # TypeScript interfaces
│   └── main.ts               # Main application entry
├── index.html                # HTML entry point
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Technology Stack

- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast build tool with HMR
- **CSS Modules**: Organized styling with custom properties
- **Cloudflare Pages**: Global CDN deployment

## 📊 Timeline Coverage

### Major Eras
- **1950-1970s**: Early Foundations
- **1980s**: Expert Systems Era
- **1990s**: Machine Learning Era
- **2000s**: Data & Learning
- **2012-2015**: Deep Learning Revolution
- **2016-2018**: Superhuman Performance
- **2019-2020**: Scaling Up
- **2021-2025**: Modern AI Era

### Key Events Include
- 1950: Turing Test
- 1956: Dartmouth Conference
- 1997: Deep Blue defeats Kasparov
- 2012: AlexNet breakthrough
- 2016: AlphaGo defeats Lee Sedol
- 2022: ChatGPT launch
- 2023: GPT-4 release
- 2024: AI reasoning models (o1)
- 2025: Multimodal convergence

## 🔄 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

### Update Timeline Data
```bash
npm run update
```

## 📝 Adding Events

To add new events to the timeline:

1. Edit `src/data/timeline.json`
2. Add your event to the appropriate era
3. Follow the existing data structure:

```json
{
  "date": "Month Year",
  "title": "Event Title",
  "description": "Brief description",
  "details": [
    "Detail 1",
    "Detail 2"
  ],
  "links": [
    {
      "text": "Link Text",
      "url": "https://example.com"
    }
  ]
}
```

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/variables.css`:
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #059669;
  /* ... */
}
```

### Spacing
Adjust timeline event spacing using classes:
- `space-medium`: 65px margin
- `space-large`: 95px margin
- `space-xlarge`: 135px margin

## 📄 License

MIT License - feel free to use this project for educational or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

Franz Enzenhofer - [franzai.com](https://franzai.com)

---

*Last Updated: January 27, 2025*
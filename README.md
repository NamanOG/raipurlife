
# Raipur.life 🏙️

A community-driven platform to discover the best places in Raipur, Chhattisgarh. From local eateries to tourist attractions, find trusted recommendations from fellow Raipurians.

## Features ✨

- **Discover Places**: Find restaurants, cafes, shopping centers, and tourist spots
- **Community Reviews**: Read authentic reviews from locals
- **Quick Actions**: Easy navigation to different categories
- **Local Stories**: Personal experiences shared by community members
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack 🛠️

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/raipur-life.git
   cd raipur-life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── QuickActions.tsx # Quick action cards
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Helper functions and constants
├── types/              # TypeScript type definitions
└── lib/                # Utility libraries
```

## Contributing 🤝

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## Development Guidelines 📋

- Use TypeScript for type safety
- Follow the existing code style and patterns
- Write meaningful commit messages
- Test your changes across different screen sizes
- Ensure accessibility standards are met

## Building for Production 🏗️

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment 🚀

This project can be deployed to various platforms:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Community 👥

- **Website**: [raipur.life](https://raipur.life)
- **Twitter**: [@raipur_life](https://twitter.com/raipur_life)
- **Instagram**: [@raipurlife](https://instagram.com/raipurlife)

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Support 💬

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact us at hello@raipur.life
- Follow us on social media for updates

---

Made with ❤️ for the Raipur community

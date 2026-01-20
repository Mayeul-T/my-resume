# Contributing to My Resume

Thank you for your interest in contributing! This project is a personal portfolio/resume website, but contributions are welcome.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce it
- Expected vs actual behavior
- Your environment (browser, OS, Node version)

### Suggesting Features

Have an idea? Open an issue to discuss it before submitting a PR.

### Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your changes (`git checkout -b feature/my-feature`)
3. **Make your changes**
4. **Test** your changes locally (`pnpm dev`, `pnpm test`)
5. **Commit** your changes
6. **Push** to your fork
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/my-resume.git
cd my-resume

# Install dependencies
pnpm install

# Setup local environment
pnpm setup

# Start dev server
pnpm dev
```

## Running Tests

```bash
pnpm test        # Watch mode
pnpm test:run    # Single run
```

## Code Style

This project uses ESLint and Prettier. Run `pnpm lint` before submitting.

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.

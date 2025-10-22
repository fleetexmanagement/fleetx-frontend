# 🤝 Contributing Guide

Thank you for your interest in contributing to the Bulletproof Nx Starter Kit! This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project follows a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**: Required for development
- **Git**: Version control
- **npm/yarn/pnpm**: Package manager
- **VS Code**: Recommended editor with extensions

### Development Setup

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub
   git clone https://github.com/your-username/nx-starter-kit.git
   cd nx-starter-kit
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set up Git Hooks**
   ```bash
   npm run prepare
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

### Recommended VS Code Extensions

- **Nx Console**: Nx workspace management
- **Biome**: Linting and formatting
- **TypeScript**: Type checking
- **Tailwind CSS IntelliSense**: CSS autocomplete
- **GitLens**: Git integration

## 🔄 Development Workflow

### Branch Strategy

We use **Git Flow** with the following branch types:

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features
- **`feature/*`**: New features
- **`bugfix/*`**: Bug fixes
- **`hotfix/*`**: Critical production fixes

### Creating a Feature

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following our standards
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   # Run all tests
   npm run test
   
   # Run linting
   npm run lint
   
   # Check formatting
   npm run format
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

## 📝 Code Standards

### TypeScript Guidelines

- **Strict Mode**: Always use strict TypeScript
- **Type Safety**: Avoid `any` types
- **Interfaces**: Use interfaces for object shapes
- **Enums**: Use const enums for constants


### E2E Tests

- **Critical Paths**: Test user journeys
- **Cross-browser**: Test in multiple browsers
- **Realistic Data**: Use realistic test data

## 📝 Commit Guidelines

We use **Conventional Commits** for consistent commit messages.

### Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **`feat`**: New feature
- **`fix`**: Bug fix
- **`docs`**: Documentation changes
- **`style`**: Code style changes (formatting, etc.)
- **`refactor`**: Code refactoring
- **`test`**: Adding or updating tests
- **`chore`**: Maintenance tasks
- **`build`**: Build system changes
- **`ci`**: CI/CD changes

### Examples

```bash
# ✅ Good
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
test(api): add user service tests
chore(deps): update dependencies

# ❌ Bad
fix stuff
update
changes
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update Documentation**: Update docs for new features
2. **Add Tests**: Ensure adequate test coverage
3. **Check Linting**: Run `npm run lint`
4. **Check Formatting**: Run `npm run format`
5. **Run Tests**: Ensure all tests pass

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs
2. **Code Review**: Team members review code
3. **Testing**: Manual testing if needed
4. **Approval**: At least one approval required
5. **Merge**: Squash and merge to develop

## 🐛 Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Node version, etc.
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Additional Context**: Any other relevant information

## 🎯 Development Tips

### Nx Commands

```bash
# Generate new library
nx g @nx/react:lib my-lib

# Generate new component
nx g @nx/react:component my-component --project=my-lib

# Run affected tests
nx affected --target=test

# Build specific project
nx build my-app

# Run linting
nx affected --target=biome-lint
```

### Performance Tips

- **Use Nx Graph**: Visualize project dependencies
- **Affected Commands**: Only run what changed
- **Caching**: Leverage Nx caching
- **Bundle Analysis**: Analyze bundle sizes

### Debugging

- **Nx Console**: Use Nx Console for commands
- **Debug Mode**: Use `--verbose` for detailed output
- **Cache Issues**: Run `nx reset` to clear cache
- **Dependency Issues**: Check project graph

## 📚 Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)

## 🆘 Getting Help

- **GitHub Issues**: Create an issue for bugs or questions
- **GitHub Discussions**: Use discussions for general questions
- **Documentation**: Check the docs folder
- **Team Chat**: Join our team communication channels

## 🙏 Recognition

Contributors will be recognized in:
- **README**: Listed as contributors
- **Release Notes**: Mentioned in changelog
- **Team Communication**: Acknowledged in team updates

Thank you for contributing to the Bulletproof Nx Starter Kit! 🚀

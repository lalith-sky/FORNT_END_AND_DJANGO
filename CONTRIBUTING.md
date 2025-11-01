# Contributing to ResQ

Thank you for your interest in contributing to ResQ! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why this enhancement would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** outlined below
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request** with a comprehensive description

## 💻 Development Setup

### Frontend Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

### Backend Development

```bash
cd resq_backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

## 📝 Coding Standards

### JavaScript/React

- Use **functional components** with hooks
- Follow **ESLint** configuration
- Use **meaningful variable names**
- Write **comments** for complex logic
- Keep components **small and focused**
- Use **PropTypes** or TypeScript for type checking

### Python/Django

- Follow **PEP 8** style guide
- Use **descriptive function and variable names**
- Write **docstrings** for functions and classes
- Keep functions **focused and small**
- Write **unit tests** for new features

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Examples:
```
feat: Add emergency alert notification system
fix: Resolve map rendering issue on mobile devices
docs: Update installation instructions
style: Format code according to ESLint rules
refactor: Simplify authentication logic
test: Add unit tests for user service
```

## 🧪 Testing

### Frontend Testing

```bash
# Run tests (when test suite is added)
npm test

# Run tests in watch mode
npm test -- --watch
```

### Backend Testing

```bash
# Run Django tests
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 📚 Documentation

- Update README.md if you change functionality
- Add JSDoc comments for JavaScript functions
- Add docstrings for Python functions
- Update API documentation for backend changes

## 🔍 Code Review Process

1. At least one maintainer must approve the PR
2. All CI checks must pass
3. Code must follow style guidelines
4. Tests must be included for new features
5. Documentation must be updated

## 🎯 Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── pages/          # Page-level components
├── style/          # Global styles
└── utils/          # Helper functions

resq_backend/
├── api/            # API endpoints
├── models/         # Database models
├── serializers/    # DRF serializers
└── views/          # View logic
```

## ❓ Questions?

Feel free to open an issue with the `question` label if you need help or clarification.

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

Thank you for contributing to ResQ! 🚀

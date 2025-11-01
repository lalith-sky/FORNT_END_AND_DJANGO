# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within ResQ, please send an email to the project maintainers. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity and complexity

## Security Best Practices

### For Contributors

1. **Never commit sensitive data** (API keys, passwords, tokens)
2. **Use environment variables** for configuration
3. **Keep dependencies updated** regularly
4. **Follow secure coding practices**
5. **Validate and sanitize all inputs**
6. **Use HTTPS** for all external communications

### For Users

1. **Keep your installation updated** with the latest security patches
2. **Use strong passwords** and enable 2FA where available
3. **Review permissions** granted to the application
4. **Monitor logs** for suspicious activity
5. **Report vulnerabilities** responsibly

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed. Users will be notified through:

- GitHub Security Advisories
- Release notes
- Project README

## Acknowledgments

We appreciate the security research community's efforts in responsibly disclosing vulnerabilities. Contributors who report valid security issues will be acknowledged in our release notes (unless they prefer to remain anonymous).

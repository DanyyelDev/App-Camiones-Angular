# App-Camiones-Angular

## Developer guide

### Run application
Run Angular project:

```bash
# Just install dependencies:
npm ci
# Or install and update dependencies:
npm install
# Run Angular server in local machine:
ng serve
# Run Angular server in the LAN:
ng serve --host 0.0.0.0
# Run Angular server using `ng` version installed on node_modules:
npx ng serve
```

### Fix lint and format issues

```bash
npm run code-fix
```

### Customize editor

Example of `.vscode/settings.json`:

```json
{
  "editor.detectIndentation": true,
  "editor.tabSize": 4,
  "[html]": {
    "editor.tabSize": 2
  },
  "[css]": {
    "editor.tabSize": 2
  }
}
```


# ShopEase React E-Commerce Project

A responsive React.js student project with product browsing, search/filter/sort, product details, a local-storage cart, demo checkout, About, Contact, and a demo newsletter.

## Requirements
- Node.js and npm
- VS Code (recommended)

## Run the project
1. Extract the ZIP.
2. Open the `shopease-react-ecommerce` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:
   ```bash
   npm install
   npm start
   ```
5. The site should open at `http://localhost:3000`.

If PowerShell blocks `npm.ps1`, use:
```powershell
npm.cmd install
npm.cmd start
```

## Build check
Run `npm run build` (or `npm.cmd run build` in PowerShell). A successful build creates a `build` folder.

## GitHub and Vercel
1. Create a GitHub repository named `shopease-react-ecommerce`.
2. Upload the project files. Do not upload `node_modules`.
3. In Vercel, choose Add New > Project, import the GitHub repository, and deploy.
4. If Vercel asks for settings, framework should be Create React App; build command `npm run build`; output directory `build`.

## Notes
- Product images use remote Unsplash image URLs, so an internet connection is needed for those images.
- Cart data is saved in the current browser using localStorage.
- Checkout, contact, and newsletter are demonstration forms only. They do not process real payments, save orders to a server, or send emails.
- Prices are in Pakistani rupees (Rs).

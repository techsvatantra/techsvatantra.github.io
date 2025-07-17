# Build Commands

## Production build (default)
npm run build

## Development build (unminified, with source maps)
npm run build:dev

## Debug build (readable names, no hashes)
npm run build:debug

## Build with detailed output
npm run build -- --logLevel info

## Build and serve to test
npm run build && npm run preview

## Alternative development build command
npm run build -- --mode development

## watch changes in debug mode
npm run build:watch
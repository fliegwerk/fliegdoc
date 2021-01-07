# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/fliegwerk/fliegdoc/compare/v0.2.0...v0.3.0) (2021-01-07)

### ⚠ BREAKING CHANGES

- Tags in TSDoc comments (@example, @returns, etc.) have to be the first element in the line, now. The only exeception to this is `{@link ABC}`, which works inline.

### Features

- "Better" TSDoc parser ([d5bca40](https://github.com/fliegwerk/fliegdoc/commit/d5bca40938542486c011b19e55418db36c350e84))

## [0.2.0](https://github.com/fliegwerk/fliegdoc/compare/v0.1.8...v0.2.0) (2021-01-07)

### ⚠ BREAKING CHANGES

- **dependencies:** Views now have to be written using `eta`

### Features

- Add `externalLinks` config parameter to add external links to the page ([1d7a8ef](https://github.com/fliegwerk/fliegdoc/commit/1d7a8ef5b8c6ced1ed1e5fd221c03945bab0bfc7))
- Add `title` config parameter to adjust the doc page title ([32d876b](https://github.com/fliegwerk/fliegdoc/commit/32d876b1e769006f4f059c8c5af401a17db2c682))
- **dependencies:** Replaced `chalk` with more lightweight `colorette` ([ec219b2](https://github.com/fliegwerk/fliegdoc/commit/ec219b2f58c30070786aa034f436da4312645a92))
- **dependencies:** replaced `ejs` with more light-weight and faster `eta` ([cbd5ea1](https://github.com/fliegwerk/fliegdoc/commit/cbd5ea1d7e7501c3472c542086933941cd8e1ee7))
- **dependencies:** replaced `markdown-it` with more light-weight and faster `remarkable` ([fc858a4](https://github.com/fliegwerk/fliegdoc/commit/fc858a4d71774497338d43872ef933cfd86af8ab))

### Bug Fixes

- Eta build on UNIX ([8e8821c](https://github.com/fliegwerk/fliegdoc/commit/8e8821c86194f6e27905c4cd244614e812222899))

### [0.1.8](https://github.com/fliegwerk/fliegdoc/compare/v0.1.7...v0.1.8) (2021-01-07)

### Bug Fixes

- Include Typescript Definitions in package ([ba75936](https://github.com/fliegwerk/fliegdoc/commit/ba759361168bf7144820cc4eda4788ae2ae9084c))

### [0.1.7](https://github.com/fliegwerk/fliegdoc/compare/v0.1.6...v0.1.7) (2021-01-07)

### Bug Fixes

- View folder location for `serveDynamic()` ([8c0cdde](https://github.com/fliegwerk/fliegdoc/commit/8c0cdde7eb0788e56c53eee2472a78b5e07c6073))

### [0.1.6](https://github.com/fliegwerk/fliegdoc/compare/v0.1.5...v0.1.6) (2021-01-07)

### Features

- Type optimizations, ESLint ([aa60111](https://github.com/fliegwerk/fliegdoc/commit/aa60111f58aea9aa042027b409cba4f37e6751e2))

### [0.1.5](https://github.com/fliegwerk/fliegdoc/compare/v0.1.4...v0.1.5) (2021-01-07)

### [0.1.4](https://github.com/fliegwerk/fliegdoc/compare/v0.1.3...v0.1.4) (2021-01-07)

### [0.1.3](https://github.com/fliegwerk/fliegdoc/compare/v0.1.2...v0.1.3) (2021-01-07)

### [0.1.2](https://github.com/fliegwerk/fliegdoc/compare/v0.1.1...v0.1.2) (2021-01-07)

### [0.1.1](https://github.com/fliegwerk/fliegdoc/compare/v0.1.0...v0.1.1) (2021-01-07)

## 0.1.0 (2021-01-07)

### Features

- Add baseUrl config option ([65e923b](https://github.com/fliegwerk/fliegdoc/commit/65e923ba488b18b9e0ce384fdbffe27b8a5e5f0e))
- **cli:** Add option to serve the build output statically after the build ([2933bc2](https://github.com/fliegwerk/fliegdoc/commit/2933bc21dd730da218227e506e3fc6d7b22f1002))
- **cli:** Add port option to build and serve ([cc3782d](https://github.com/fliegwerk/fliegdoc/commit/cc3782d4e5b4a836f01d177bf977555760d1b3af))
- **cli:** Progress feedback and zsh completion script ([4ce2ee5](https://github.com/fliegwerk/fliegdoc/commit/4ce2ee51d338c3c4badae1b78504016313554fdb))
- Added CLI functionality and documentation using the tool itself :P ([c01bc7a](https://github.com/fliegwerk/fliegdoc/commit/c01bc7a351bf09b891bc43c632fa2e531a2ed771))
- Initial commit ([de67ad1](https://github.com/fliegwerk/fliegdoc/commit/de67ad175fed1484f61cb98f62332d37e023eab0))

### Bug Fixes

- **theme:** Removed old "default" headline in header ([c9caefd](https://github.com/fliegwerk/fliegdoc/commit/c9caefdfdb663cf32a0b052ef8f0cdd47771471c))
- **theme:** Removed old "default" headline in header ([d62a41b](https://github.com/fliegwerk/fliegdoc/commit/d62a41bb9a83c542f63c389a4b3f1982439485d7))
- Move [@ts-ignore](https://github.com/ts-ignore) comment back into correct line ([411e509](https://github.com/fliegwerk/fliegdoc/commit/411e509f4e91383e4134885aa2e14596ab310a10))

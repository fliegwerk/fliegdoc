# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.1](https://github.com/fliegwerk/fliegdoc/compare/v0.5.0...v0.5.1) (2021-06-28)


### Bug Fixes

* Fix the problem caused by flexsearch quoting cdn without specifying the version. Currently, it is modified to 0.6.32 to ensure that there will be no errors due to the upgrade to 0.7 ([40b6c34](https://github.com/fliegwerk/fliegdoc/commit/40b6c3407e77cc048a49f3d28e6147c0d7640a43))

## [0.5.0](https://github.com/fliegwerk/fliegdoc/compare/v0.4.7...v0.5.0) (2021-05-05)


### ⚠ BREAKING CHANGES

* To keep other dependencies up to date, fliegdoc no longer supports `node` v10 (as v10 has also reached EOL of being maintained). You now require `node` v12 or higher to use `fliegdoc`

### Features

* Require node >= v12 ([46350c7](https://github.com/fliegwerk/fliegdoc/commit/46350c7105eee44bffa0785e3d8a0a0ee8be4876))


### Bug Fixes

* Fix compatibility issues for ts-morph v10 ([0d87d87](https://github.com/fliegwerk/fliegdoc/commit/0d87d879481c878684ff42b874a70c253761403d))

### [0.4.7](https://github.com/fliegwerk/fliegdoc/compare/v0.4.6...v0.4.7) (2021-02-06)

### Bug Fixes

- **html-theme:** Add support for UTF-8 characters (for non-English documentation) ([#47](https://github.com/fliegwerk/fliegdoc/issues/47)) ([d3159f6](https://github.com/fliegwerk/fliegdoc/commit/d3159f6d8642aadd1098d9a7e8148bcad1ecd8b7))

### [0.4.6](https://github.com/fliegwerk/fliegdoc/compare/v0.4.5...v0.4.6) (2021-02-05)

### Bug Fixes

- **html-theme:** Fix constructor function name `undefined` ([db6d4ce](https://github.com/fliegwerk/fliegdoc/commit/db6d4ce41721e5ff9c36e47c166f06fb3b04856d)), closes [#37](https://github.com/fliegwerk/fliegdoc/issues/37)

### [0.4.5](https://github.com/fliegwerk/fliegdoc/compare/v0.4.4...v0.4.5) (2021-01-24)

### Bug Fixes

- Upgrade search-popup to v2 and remove `scroll-behavior: smooth` due to incompatibility ([f6a481e](https://github.com/fliegwerk/fliegdoc/commit/f6a481e72b60a2660a9246815db3f0bb4034d5c9)), closes [#26](https://github.com/fliegwerk/fliegdoc/issues/26)

### [0.4.4](https://github.com/fliegwerk/fliegdoc/compare/v0.4.3...v0.4.4) (2021-01-21)

### Bug Fixes

- **html-theme:** Fix extends declaration implementation for classes ([2c2e159](https://github.com/fliegwerk/fliegdoc/commit/2c2e1596372fea26543583e5c35dda2528f094f2))

### [0.4.3](https://github.com/fliegwerk/fliegdoc/compare/v0.4.2...v0.4.3) (2021-01-19)

### Features

- Replace `string.replaceAll` call with `string.replace` ([e970fb1](https://github.com/fliegwerk/fliegdoc/commit/e970fb1c975dc0d0245acbaa82622ebb5fda743e)), closes [#20](https://github.com/fliegwerk/fliegdoc/issues/20)
- Support NodeJS 10+ ([#28](https://github.com/fliegwerk/fliegdoc/issues/28)) ([622d6ca](https://github.com/fliegwerk/fliegdoc/commit/622d6cab65894f017f265c50b7332885beff2a27)), closes [#20](https://github.com/fliegwerk/fliegdoc/issues/20)

### Bug Fixes

- **html-theme:** Fix broken links in search index introduced in be6baffca4bf663c9f6664397f319c659e162059 ([4041fc0](https://github.com/fliegwerk/fliegdoc/commit/4041fc02a29eda29a4df7258a7448c294d524ce2))

### [0.4.2](https://github.com/fliegwerk/fliegdoc/compare/v0.4.1...v0.4.2) (2021-01-11)

### Features

- Search ([#10](https://github.com/fliegwerk/fliegdoc/issues/10)) ([0a3c342](https://github.com/fliegwerk/fliegdoc/commit/0a3c342f81bcc36743cec13708ae538ba6301d13))

### [0.4.1](https://github.com/fliegwerk/fliegdoc/compare/v0.4.0...v0.4.1) (2021-01-08)

### Features

- Add fliegdoc [i|init] to generate a fliegdoc.config.js ([044319e](https://github.com/fliegwerk/fliegdoc/commit/044319efff558ca6ade85a231c7e4ea6c315c802))

## [0.4.0](https://github.com/fliegwerk/fliegdoc/compare/v0.3.2...v0.4.0) (2021-01-08)

### ⚠ BREAKING CHANGES

- serveDynamic no longer renders the templates "on request", but instead once when called
- Private class members are now hidden by default. To re-enable them, you must set `hidePrivateMembers: false` in your config
- Instead of passing the configuration overrides as parameters to the individual functions, you now have to call `require('fliegdoc').setConfig(config, configBasePath)` to set a configuration

### Features

- **theme:** Add local image handling for README.md in HTML Theme ([ecff4fd](https://github.com/fliegwerk/fliegdoc/commit/ecff4fd63c489c0ea70cd5c8ed1253c5998a286c))
- Add option to hide private class members ([0dffeb8](https://github.com/fliegwerk/fliegdoc/commit/0dffeb855cc042d7eb3bec659337a83c54f1f648)), closes [#6](https://github.com/fliegwerk/fliegdoc/issues/6)
- Export `HTMLTheme` in `index.ts` ([b6eb166](https://github.com/fliegwerk/fliegdoc/commit/b6eb166b2650aab9f63ef9286bb6e97da1cefbe0))
- Extract theme into an object passable to the config as `theme` ([dc21697](https://github.com/fliegwerk/fliegdoc/commit/dc216979284a8103da740f03731870ad4b1ce228)), closes [#7](https://github.com/fliegwerk/fliegdoc/issues/7)
- Improve class documentation template ([f4600d9](https://github.com/fliegwerk/fliegdoc/commit/f4600d96405bc33ea25a05a34e53c48e37825f8c))
- Improve function documentation template ([b506770](https://github.com/fliegwerk/fliegdoc/commit/b506770b1cbd2b8d1ba15ec3cfc5f4745ac78ed1))
- Move `default-html` to `html` ([be4423c](https://github.com/fliegwerk/fliegdoc/commit/be4423c19c1272da1af6672a7d60a1b612147fd3))
- Rename `DefaultHTMLTheme` to `HTMLTheme` ([ec30134](https://github.com/fliegwerk/fliegdoc/commit/ec30134af1b7a2db8bf7a915c10a24bab17c5538))
- Revamp API configuration system ([c69493e](https://github.com/fliegwerk/fliegdoc/commit/c69493e316a667f73e4805fe1a26c93d84f4d714)), closes [#5](https://github.com/fliegwerk/fliegdoc/issues/5)

### Bug Fixes

- Fix creating directories in buildStatic ([9d66ebd](https://github.com/fliegwerk/fliegdoc/commit/9d66ebd74ac1d24e6c78d4bc831e2caa9727e32b))
- Remove console.log statement in `serveDynamic` ([c87a4a1](https://github.com/fliegwerk/fliegdoc/commit/c87a4a161f9858b50c807b750b2dee9e1c8dc18d))

### [0.3.2](https://github.com/fliegwerk/fliegdoc/compare/v0.3.1...v0.3.2) (2021-01-07)

### Bug Fixes

- Also apply custom TSDoc parser in interfaces and classes ([4fe187a](https://github.com/fliegwerk/fliegdoc/commit/4fe187a2c578994899fddf1b5dd5f8a2d2193d9e))

### [0.3.1](https://github.com/fliegwerk/fliegdoc/compare/v0.3.0...v0.3.1) (2021-01-07)

### Bug Fixes

- Remove external links from `DEFAULT_CONFIG` ([8cc925b](https://github.com/fliegwerk/fliegdoc/commit/8cc925bf3202a533f827d882bd11be165e34ae0d))

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

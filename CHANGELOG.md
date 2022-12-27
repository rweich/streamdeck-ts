# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.0](https://github.com/rweich/streamdeck-ts/compare/v4.1.0...v5.0.0) (2022-12-27)


### ⚠ BREAKING CHANGES

* streamdeck-events experienced a breaking change between 4.1.0 -> 5.0.0. While this library itself experienced no changes, most consumers appear to use this dependency transitively.

### Miscellaneous Chores

* Update streamdeck-events to 5.0.0 ([0a585f2](https://github.com/rweich/streamdeck-ts/commit/0a585f2af15d81ba6b34671f43f9adb10dfcd569))

## [4.1.0](https://github.com/rweich/streamdeck-ts/compare/v4.0.4...v4.1.0) (2022-12-19)


### Features

* Add Stream Deck+ Support ([9f59eb8](https://github.com/rweich/streamdeck-ts/commit/9f59eb8bd8896d551766c39dceb0fd6eb5018a3e))


### Miscellaneous Chores

* Update dependencies ([9b5c4aa](https://github.com/rweich/streamdeck-ts/commit/9b5c4aa50237a9b21c40926f7e6c45026812a0d9))

## [4.0.4](https://github.com/rweich/streamdeck-ts/compare/v4.0.3...v4.0.4) (2022-10-22)


### Bug Fixes

* add executable flag to githooks ([4d04386](https://github.com/rweich/streamdeck-ts/commit/4d0438683894795365e3688f0b6677a28ed8b0f0))


### Miscellaneous Chores

* update dependencies ([4000939](https://github.com/rweich/streamdeck-ts/commit/40009393efd62fa73194c3af191e03d54d92d789))

### [4.0.3](https://github.com/rweich/streamdeck-ts/compare/v4.0.2...v4.0.3) (2022-06-10)


### Miscellaneous Chores

* **deps-dev:** bump semantic-release from 19.0.2 to 19.0.3 ([ac66bfb](https://github.com/rweich/streamdeck-ts/commit/ac66bfba02ca756e65007a63274dfbb790f5041d))

### [4.0.2](https://github.com/rweich/streamdeck-ts/compare/v4.0.1...v4.0.2) (2022-06-04)


### Documentation

* update event payload for key-events ([5973637](https://github.com/rweich/streamdeck-ts/commit/59736371eec392ff44762f5db37161548dd38f69))


### Miscellaneous Chores

* add @types/node package ([d2d5518](https://github.com/rweich/streamdeck-ts/commit/d2d55184af9df37109ee277ce5b7234b2d27ce04))
* **deps:** bump npm from 8.5.5 to 8.12.0 ([19eb688](https://github.com/rweich/streamdeck-ts/commit/19eb688100fc0828220f88e194171d6d30d0967c))
* **deps:** bump semver-regex from 3.1.3 to 3.1.4 ([b8de483](https://github.com/rweich/streamdeck-ts/commit/b8de483a5df89896ab6483ef5ee9c7a370f66698))
* update dependencies ([b0794f0](https://github.com/rweich/streamdeck-ts/commit/b0794f00c3bba4bcfb4a9d1111d3291fa4f4a80f))

### [4.0.1](https://github.com/rweich/streamdeck-ts/compare/v4.0.0...v4.0.1) (2022-03-29)


### Miscellaneous Chores

* **deps:** bump minimist from 1.2.5 to 1.2.6 ([a555e30](https://github.com/rweich/streamdeck-ts/commit/a555e3059011e423345355d33e58d9aeaf8a48c7))

## [4.0.0](https://github.com/rweich/streamdeck-ts/compare/v3.1.0...v4.0.0) (2022-02-04)


### ⚠ BREAKING CHANGES

* the minimum required version of node is now v14.17

### Bug Fixes

* linting and test errors ([babbce4](https://github.com/rweich/streamdeck-ts/commit/babbce43a7888da036caf1dbfeb0f24c8ec0c568))
* tests not closing their ws-connections ([28db6a1](https://github.com/rweich/streamdeck-ts/commit/28db6a1b54f6cdaf4e2376f4d91a031f6db539f8))


### Documentation

* add upgrade notes for v4 ([5bd309f](https://github.com/rweich/streamdeck-ts/commit/5bd309fb31fb87a95ad0dbe306b05a667dad9669))


### Miscellaneous Chores

* drop support for node v12 and v15 ([d11d4fd](https://github.com/rweich/streamdeck-ts/commit/d11d4fdd31560dac288467221bc755dbddf9bd8a))
* fix linting warnings ([ca05f67](https://github.com/rweich/streamdeck-ts/commit/ca05f6768dac03c1d9f7480f3d1eeb2486ebd7bb))
* upgrade dependencies (major) ([37751c4](https://github.com/rweich/streamdeck-ts/commit/37751c4c394a790d73956ee43ba0cb994b155130))

## [3.1.0](https://github.com/rweich/streamdeck-ts/compare/v3.0.0...v3.1.0) (2022-01-15)


### Features

* expose actionInfo property in PI ([#14](https://github.com/rweich/streamdeck-ts/issues/14)) ([f137b49](https://github.com/rweich/streamdeck-ts/commit/f137b49017b3e4ee442a415f35545674fb0c30b2))

## [3.0.0](https://github.com/rweich/streamdeck-ts/compare/v2.1.3...v3.0.0) (2021-12-11)


### ⚠ BREAKING CHANGES

* due to the update some events have to be handled differently:
the row/column props in keyup/keydown, willappear/willdisappear and
didreceivesettings events might be undefined now!

### Miscellaneous Chores

* update streamdeck-events to v2 ([1c5cd9b](https://github.com/rweich/streamdeck-ts/commit/1c5cd9b966a587dd5a297b9398924afdfe1f8772))


### Documentation

* update docs to reflect the streamdeck-events changes ([6b16c8e](https://github.com/rweich/streamdeck-ts/commit/6b16c8ee87f68da693f256d35d19c06dd6cc6bb6))

### [2.1.3](https://github.com/rweich/streamdeck-ts/compare/v2.1.2...v2.1.3) (2021-09-15)


### Miscellaneous Chores

* update dependencies ([9e5ab04](https://github.com/rweich/streamdeck-ts/commit/9e5ab0436e32a6296a27d94dcbcd104a335f5469))

### [2.1.2](https://github.com/rweich/streamdeck-ts/compare/v2.1.1...v2.1.2) (2021-09-01)


### Bug Fixes

* typescript warning ([f90dafe](https://github.com/rweich/streamdeck-ts/commit/f90dafec8e9543019639506b7ecd70274daf98e6))


### Miscellaneous Chores

* update dependencies ([3695ffb](https://github.com/rweich/streamdeck-ts/commit/3695ffba8183ef465ba33ed9405918068f099b8a))
* **deps:** bump tar from 6.1.5 to 6.1.11 ([245653e](https://github.com/rweich/streamdeck-ts/commit/245653ec42c97e3e06959a391dbe283dbadd4ca1))

### [2.1.1](https://github.com/rweich/streamdeck-ts/compare/v2.1.0...v2.1.1) (2021-08-05)


### Miscellaneous Chores

* **deps:** bump tar from 6.1.0 to 6.1.5 ([2517965](https://github.com/rweich/streamdeck-ts/commit/2517965395de710ebcfe07e1ac210a47e92f213a))

## [2.1.0](https://github.com/rweich/streamdeck-ts/compare/v2.0.0...v2.1.0) (2021-05-29)


### Features

* add missing events and listeners ([67214f6](https://github.com/rweich/streamdeck-ts/commit/67214f6e5650915b3a57b74215369068c7be1150))


### Miscellaneous Chores

* update dependencies ([5434d87](https://github.com/rweich/streamdeck-ts/commit/5434d8712012e0455a3477bf56914189f40f33d6))
* update ws-package ([41511b9](https://github.com/rweich/streamdeck-ts/commit/41511b9b4169d07e06a375117d55e37b3c5c54eb))

# [2.0.0](https://github.com/rweich/streamdeck-ts/compare/v1.4.0...v2.0.0) (2021-05-24)


### Bug Fixes

* bump node version to >=12 ([b09743b](https://github.com/rweich/streamdeck-ts/commit/b09743ba8b6dc9762dda124c47bbb4462ca7b994))
* bump versions ([7f2fefe](https://github.com/rweich/streamdeck-ts/commit/7f2fefe1f3250af23c183118a774d1085752e1fd))


### BREAKING CHANGES

* node 10 no longer supported!

# [1.4.0](https://github.com/rweich/streamdeck-ts/compare/v1.3.0...v1.4.0) (2021-04-02)


### Features

* add support for sendToPropertyInspector event ([20d3830](https://github.com/rweich/streamdeck-ts/commit/20d3830c6cce03f25dda84340b472a722cd93906))
* simplify events sent ([49bf1e4](https://github.com/rweich/streamdeck-ts/commit/49bf1e4f3f32803f09910455839b12a33cdf8b14))

# [1.3.0](https://github.com/rweich/streamdeck-ts/compare/v1.2.0...v1.3.0) (2021-03-29)


### Features

* simplify event listener usage ([80dcf0d](https://github.com/rweich/streamdeck-ts/commit/80dcf0ddf9593a4ac708675f98a7f2144f8798b5))

# [1.2.0](https://github.com/rweich/streamdeck-ts/compare/v1.1.0...v1.2.0) (2021-03-14)


### Features

* ability to inject the logger to be used ([a8bf215](https://github.com/rweich/streamdeck-ts/commit/a8bf215bc300162b91cb0b8f790515bd6e284ec9))

# [1.1.0](https://github.com/rweich/streamdeck-ts/compare/v1.0.2...v1.1.0) (2021-02-25)


### Features

* add some missing outgoing events ([6137c15](https://github.com/rweich/streamdeck-ts/commit/6137c155af9762525ab2e6688d46057cefb1aaf2))

## [1.0.2](https://github.com/rweich/streamdeck-ts/compare/v1.0.1...v1.0.2) (2021-02-14)


### Bug Fixes

* device events ([c820653](https://github.com/rweich/streamdeck-ts/commit/c820653e1f43f20c11ebcc695622a68aada8f652))

## [1.0.1](https://github.com/rweich/streamdeck-ts/compare/v1.0.0...v1.0.1) (2021-02-13)


### Bug Fixes

* removed assetconfig from github action ([2c7a22a](https://github.com/rweich/streamdeck-ts/commit/2c7a22a4802a083a9a98ed0a8672c347b8d7faf2))

# 1.0.0 (2021-02-13)


### Bug Fixes

* move dependencies ([196c154](https://github.com/rweich/streamdeck-ts/commit/196c154a7b5fbc37b3b39b72a24b7eef5089d2da))
* move package to dev-deps ([1711840](https://github.com/rweich/streamdeck-ts/commit/171184091ac2e29d0d48dfae8bc99b55fa0ef194))


### Features

* add propertyinspector ([151f161](https://github.com/rweich/streamdeck-ts/commit/151f16130fa88328767417fabaa128dbbd988d9b))
* added exports for all important classes ([3c7d86d](https://github.com/rweich/streamdeck-ts/commit/3c7d86d58355b18fe15f3853fae31654da29d71a))
* added injectable logger ([6e3ebeb](https://github.com/rweich/streamdeck-ts/commit/6e3ebeb37581330c64af7a5d3c4fa2096ec3ed90))
* create streamdeck plugin ([1d087c3](https://github.com/rweich/streamdeck-ts/commit/1d087c392a1028334099c0306aa4c0773126d9ad))
* narrow down the event pattern matching tests ([daf505f](https://github.com/rweich/streamdeck-ts/commit/daf505fe5e1fecac8e5bf671cb69d6252e65f5e4))

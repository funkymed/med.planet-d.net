# Ultimate Med's MusicDisk

## Yarn

### Requirement

Node 15

### Install

```bash
$ yarn
```

### Dev & Watch

```bash
$ yarn start
```

### Build

```bash
$ yarn build
```

### Build Electron version

```bash
$ yarn build
$ cp -r build/* electron
```

edit the index.html and replace `/static` by `./static`   
edit the css file, replace `/static/` by `../`

#### Preview 

```bash
$ cd electron
$ yarn start
```

#### Build a release

```bash
$ cd electron
$ yarn build-mac # build-win or build-linux
```
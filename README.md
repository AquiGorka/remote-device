# Remote Device

Remote device creates and runs a server that waits for connections from devices (smartphones or tablets) and shows a 3D model that represents the device's orientation.
Works as standalone app (build executables using node webkit build).

## Run
```shell
npm install -g nodewebkit (probably with sudo)
cd to dir
nodewebkit src/
```

## Build
```shell
npm install -g nwbuild (probably with sudo)
cd to dir
nwbuild --platform 'win','osx','linux' src/ (probably with sudo)
```

## Technologies used
- nodeJS
- node-webkit
- socket.io


### License
Available in other licenses by contacting me.

(The MIT License)

Copyright (c) 2015 Gorka Ludlow  <http://www.AquiGorka.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

#Remote Device
---

Remote device creates and runs a server that waits for connection from devices (smartphones & tablets) and shows a 3D model that represents the device orientation.
Works as standalone app (build executables using node build).

##Run
---
```shell
cd to dir
nodewebkit src/
```

##Build
---
```shell
cd to dir
sudo nwbuild --platform 'win','osx','linux' src/
```

##Technologies used
---
- nodeJS
- node-webkit
- socket.io

##Change Log
---
v0.0.16
-------
Adds gyro.js for cross-browser/device normalization of data; Adds better calculation of rotation angles

v0.0.15
-------
Adds Rooms for theater/puppet unique combinations

v0.0.14
-------
Moves Moderator to server process (for server direct access, rather than via a socket connection)

v0.0.13
-------
Adds 3D model of a smartphone

v0.0.12
-------
Moves Moderator to server as another process

v0.0.11
-------
Adds moderator abstraction to Remote Device; Removes filter to only allow 1 puppet connection

v0.0.10
-------
Adds module & router framework to Puppet; Adds Puppet abstraction to Remote Device

v0.0.9
------
Adds ThreeJS layer to device module; First working prototype to use real time data from remote device

v0.0.8
------
Synchs handling of different Theaters; Filters out more than one puppet

v0.0.7
------
Adds separation of concerns in server, theater and puppet

v0.0.6
------
Adds puppet files; Working prototype

v0.0.5
------
Serves puppet.html on any request to server

v0.0.4
------
Connects app to server as theater

v0.0.3
------
PoC that runs relay server side by side to app

v0.0.2
------
PoC that this setup can use ThreeJS

v0.0.1
------
Adds Boilerplate files + Basic App Structure + Base Files for Modules


###License
---
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
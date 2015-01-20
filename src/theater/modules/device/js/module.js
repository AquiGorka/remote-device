var DeviceModule = (function () {
	"use strict";

	var renderer, mesh, camera, scene;

	var remoteDeviceData = {
		orientation: {
			alpha: 0,
			beta: 0,
			gamma: 0
		},
		motion: {
			x: 0,
			y: 0,
			z: 0
		}
	};

	var requestAnimFrame = function () {};

	var animate = function () {
		window.requestAnimationFrame(animate);
		//
		mesh.rotation.x = remoteDeviceData.orientation.beta * Math.PI / 180;
		mesh.rotation.y = remoteDeviceData.orientation.gamma * Math.PI / 180;
		mesh.rotation.z = remoteDeviceData.orientation.alpha * Math.PI / 180;
		//
		renderer.render(scene, camera);
	}

	var DeviceModule = function () {}.mixWith(Module);

	DeviceModule.prototype._init = function () {
		this.super()._init('device');
		this.content = ''
		//
		camera = new THREE.PerspectiveCamera(75, 8/5, 1, 10000);
        camera.position.z = 1000;
        //
        scene = new THREE.Scene();
        var geometry = new THREE.BoxGeometry(300, 600, 60);
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });
        //
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(800, 500);
	};
	DeviceModule.prototype.show = function () {
		this.super().show(['device']);
		
		// subscribe to update
		Theater
			.on('data', function (rdjs, data) {
				//console.log('Theater: Data from puppet: ', data);
				remoteDeviceData = data;
			});
		//
        $('#deviceModule').empty().append(renderer.domElement);
        //
        animate();
	};

	return DeviceModule;

})();
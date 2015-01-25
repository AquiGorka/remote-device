var DeviceModule = (function () {
	"use strict";

	var SCREEN_WIDTH = window.innerWidth,
		SCREEN_HEIGHT = window.innerHeight,
		iphone,
		camera,
		scene,
		renderer,
		remoteDeviceData = {
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
		},
		myReq;

	var angle = 0;
	var d2r = Math.PI / 180;
	var eyem = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
	var rotType = "YXZ";
	var rotm;
	var devm;

	var animate = function () {
		myReq = window.requestAnimationFrame(animate);
		//
		if (iphone) {
			/*
			iphone.rotation.y = remoteDeviceData.orientation.gamma * Math.PI / 180;
			iphone.rotation.x = remoteDeviceData.orientation.beta * Math.PI / 180;
			iphone.rotation.z = remoteDeviceData.orientation.alpha * Math.PI / 180;
			*/
			// thank you so much!! https://gist.github.com/bellbind/d2be9cc09bf6241f255d
			//
	        var alpha = remoteDeviceData.orientation.alpha || 0;
	        var beta = remoteDeviceData.orientation.beta || 0;
	        var gamma = remoteDeviceData.orientation.gamma || 0;
			//
	        rotm = new THREE.Quaternion().setFromEuler(new THREE.Euler(beta * d2r, alpha * d2r, -gamma * d2r, rotType));
	        devm = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -angle * d2r, 0));
	        rotm.multiply(devm).multiply(eyem);
	        iphone.quaternion.copy(rotm);
		}
		renderer.render(scene, camera);
	}

	var init = function () {
		//
		camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 10000);
		camera.position.z = 2500;
		scene = new THREE.Scene();
		//
		var light = new THREE.AmbientLight(0xFFFFFF);
		light.position.set(50, -400, 500);
		scene.add(light);
		//
		renderer = new THREE.WebGLRenderer({
			preserveDrawingBuffer: true,
			alpha: true
		});
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(0xFFFFFF, 1);
		//
		var loader = new THREE.JSONLoader()
								.load('modules/device/obj/iphone5/iPhone5.js', setupScene);
		//
		$('#deviceModule').empty().append(renderer.domElement);
	}

	var setupScene = function (geometry, materials) {
	    var materialBack =  {
	    	opacity:1,
	    	map: THREE.ImageUtils.loadTexture('modules/device/obj/iphone5/Iphone5_diffuse.png'),
	    	color: 0x000000,
	    	ambient: 0x777777,
	    	defuse: 0xBBBB9B,
	    	shininess: 50,
	    	shading: THREE.SmoothShading
	    };
		var meshBack = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial(materialBack));
		meshBack.position.set(0,0,0);
		meshBack.scale.set(3, 3, 3);
		//
		var materialFront =  {
			opacity:1,
			map: THREE.ImageUtils.loadTexture('modules/device/obj/iphone5/Iphone5_Screen.png'),
			color: 0x000000,
			ambient: 0xAAAAAA,
			defuse: 0xBBBB9B,
			shininess: 100,
			shading: THREE.SmoothShading
		};
		var meshFront = new THREE.Mesh(new THREE.PlaneBufferGeometry(405, 712), new THREE.MeshPhongMaterial(materialFront));
		meshFront.position.set(5, 0, 92);
		meshFront.scale.set(3, 3, 3);
		//
		iphone = new THREE.Object3D();
		iphone.add(meshBack);
		iphone.add(meshFront);
		scene.add(iphone);
	}

	var DeviceModule = function () {}.mixWith(Module);

	DeviceModule.prototype.hide = function () {
		if (myReq) {
			window.cancelAnimationFrame(myReq);	
		};
		this.super().hide();
	};
	DeviceModule.prototype._init = function () {
		this.super()._init('device');
	};
	DeviceModule.prototype.show = function () {
		this.super().show(['device']);
		//
		Theater
			.on('data', function (rdjs, data) {
				remoteDeviceData = data;
			});
		//
		init();
		animate();
	};

	return DeviceModule;

})();
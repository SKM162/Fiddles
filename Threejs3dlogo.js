THREE.FresnelShader = {

	uniforms: {},

	vertexShader: [
	
		"varying vec3 vPositionW;",
		"varying vec3 vNormalW;",

		"void main() {",

		"	vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);",
		" vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );",

		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [
	
		"varying vec3 vPositionW;",
		"varying vec3 vNormalW;",

		"void main() {",
		
		"	vec3 color = vec3(0.169,0.6,1.);",
		"	vec3 viewDirectionW = normalize(cameraPosition - vPositionW);",
		"	float fresnelTerm = dot(viewDirectionW, vNormalW);",
		"	fresnelTerm = clamp(.9 - fresnelTerm, 0., 0.9);",

		"	gl_FragColor = vec4( color * fresnelTerm, 1.);",

		"}"

	].join( "\n" )

};


var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x46007B, 988, 1000)

const aspect = window.innerWidth / window.innerHeight;
const width = 50;
const height = width / aspect;
const camera = new THREE.OrthographicCamera(
  width / -2, // left
  width / 2, // right
  height / 2, // top
  height / -2, // bottom
  0.1, // near
  1000 // far
);

camera.position.set(0, 0, 1000);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0x252525);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry(10,32,25);
var base = new THREE.MeshLambertMaterial({ color: 0x2B99F, side: THREE.DoubleSide});
var shader = new THREE.ShaderMaterial({
      vertexShader: THREE.FresnelShader.vertexShader,
			fragmentShader: THREE.FresnelShader.fragmentShader
});
// var materials = [];
// materials.push(base);
// var material = new THREE.ShaderMaterial( {
// 			vertexShader: THREE.FresnelShader.vertexShader,
// 			fragmentShader: THREE.FresnelShader.fragmentShader,
//       MeshLambert: new THREE.MeshLambertMaterial({ color: 0x2B99FF })
// 		});
// var material = new THREE.MeshLambertMaterial({ color: 0x2B99FF });

var sphere = new THREE.Mesh( geometry, base );
scene.add( sphere );

const ambientLight = new THREE.AmbientLight(0x2B99FF, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x88FF6D, 1);
dirLight.position.set(30, 30, 30); // x, y, z
scene.add(dirLight);

renderer.render(scene, camera);

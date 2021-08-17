
import './App.css';
import * as THREE from 'three';
import {Canvas, useLoader} from 'react-three-fiber';
import asteroidImg from './assets/asteroid-real.png'
import { Suspense, useCallback, useMemo } from 'react';
import { Float16BufferAttribute } from 'three';

function Points () {
  const imgTexture = useLoader(THREE.TextureLoader, asteroidImg)
  //graphing using trig/ sin
  let t = 0; //phase shift
  let f = 0.002; //drives frequency
  let a = 3; //amplitude
  const graph = useCallback((x,z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }, [t,f,a])  //dependencies to change the graph

  // {x1, y1, z1, x2, y2, z2...} coordinates
  const count = 100; // number of points on y axis
  const sep = 3; //space between
  let positions = useMemo (() => {
    let positions = []

    for (let xi = 0; xi < count; xi++){
      for(let zi = 0; zi < count; zi++){
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z); //calling the graph to get y value
        positions.push(x,y,z)
      }
    }
    return new Float32Array(positions)
  }, [count, sep])


  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute 
          attachObject= {['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
          attach="material"
          map={imgTexture}
          color={0x00AAFF}
          sizeAttenuation
          transparent={false} //makes the transparency not blac
          alphaTest={0.5}
          opacity={1.0}

          />
    </points>
  );
};

function AnimationCanvas () {
  return (
    <Canvas
      colorManagement={false}
      camera={{position: [100, 10, 0], fav: 75}}
    >
        <Points />

    </Canvas>
  );
};
function App() { 
  return ( //animations take a while so we need a loading screen
    <div className="animation">  
      <Suspense fallback={<div> Loading...</div>}> 
        <AnimationCanvas />
      </Suspense>
    </div>
  );
}

export default App;

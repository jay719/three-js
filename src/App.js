
import './App.css';
import * as THREE from 'three';
import {Canvas} from 'react-three-fiber';
import asteroidImg from './assets/asteroid-real'
import { Suspense } from 'react';
import { Float16BufferAttribute } from 'three';

function Points () {
  const imgTexture = useLoader(THREE.TextureLoader, asteroidImg)

  // {x1, y1, z1, x2, y2, z2...} coordinates
  const count = 100 // number of points on y axis
  const sep = 3 //space between

  let positions = useMemo (() => {
    let positions = []

    for (let x1 = 0; x1 < count, x1++){
      for(let z1 = 0; z1 < count; z1++)
      
    }
    return new Float32Array(positions)
  })
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

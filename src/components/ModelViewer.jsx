import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Model() {
  // 注意：請確保 public/models/Modified.vrm 檔案存在且檔名正確（大小寫要一致）
  const { scene } = useGLTF('/models/Modified.vrm')
  
  return (
    <primitive 
      object={scene} 
      scale={1}           // VRM 檔案通常 1 單位 = 1 米，先用 1 試試
      position={[0, -1, 0]} 
    />
  )
}

export default function ModelViewer() {
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      width: '350px', 
      height: '350px', 
      zIndex: 999999,          // 加到極高，確保在所有元件之上
      background: 'rgba(255, 0, 0, 0.2)', // 暫時給個淡紅色背景，看到它代表元件有跑出來
      borderRadius: '20px',
      overflow: 'hidden',
      pointerEvents: 'auto'     // 確保滑鼠可以抓模型
    }}>
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
        
        {/* 模型本體 */}
        <Model />
        
        {/* 測試用黃色球：如果你看到球沒看到模型，就是模型檔案或縮放問題 */}
        <mesh position={[1, 0, 0]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="yellow" />
        </mesh>

        <OrbitControls target={[0, 1, 0]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
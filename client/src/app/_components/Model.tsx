import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/Addons.js"

export default function Model() {
     const obj = useLoader(OBJLoader, './models/breaboard.obj')
    return (
        <primitive object={obj} scale={0.1} rotation={[0, -Math.PI / 4 , 0]} position={[2, 0, -5]} receiveShadow castShadow />
    )
}
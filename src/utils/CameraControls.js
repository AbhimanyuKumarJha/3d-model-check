import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

export const CameraControls = () => {
  const { camera } = useThree();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.5;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      switch (event.key) {
        case "d":
          camera.position.x -= direction.z * speed;
          camera.position.z += direction.x * speed;
          break;
        case "a":
          camera.position.x += direction.z * speed;
          camera.position.z -= direction.x * speed;
          break;
        case "s":
          camera.position.x -= direction.x * speed;
          camera.position.z -= direction.z * speed;
          break;
        case "w":
          camera.position.x += direction.x * speed;
          camera.position.z += direction.z * speed;
          break;
        default:
          break;
      }
    };

    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = (event.clientX - lastMousePosition.x) * 0.002;
      const deltaY = (event.clientY - lastMousePosition.y) * 0.002;

      // camera.rotation.z -= deltaX; // Y-axis (horizontal rotation)
      camera.rotation.y += deltaY; // X-axis (vertical rotation)

      // Clamp the vertical rotation to avoid flipping
      // camera.rotation.x = Math.max(
      //   -Math.PI / 2,
      //   Math.min(Math.PI / 2, camera.rotation.z)
      // );

      setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleWheel = (event) => {
      const zoomSpeed = 0.1;
      camera.position.z += event.deltaY * zoomSpeed;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [camera, isMouseDown, lastMousePosition]);

  return null;
};

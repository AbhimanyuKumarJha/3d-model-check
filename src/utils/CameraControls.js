import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export const CameraControls = () => {
  const { camera } = useThree();
  console.log(camera);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.5;
      switch (event.key) {
        case "a":
          camera.position.z -= speed;
          break;
        case "d":
          camera.position.z += speed;
          break;
        case "s":
          camera.position.x -= speed;
          break;
        case "w":
          camera.position.x += speed;
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

      const deltaX = event.clientX - lastMousePosition.x;
      const deltaY = event.clientY - lastMousePosition.y;

      camera.rotation.y -= deltaX * 0.002;
      camera.rotation.x -= deltaY * 0.002;

      setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [camera, isMouseDown, lastMousePosition]);

  return null;
};

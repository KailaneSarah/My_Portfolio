'use client';

import { useEffect, useRef } from 'react';

interface Props {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export default function AnimatedSquaresBackground({
  direction = 'diagonal',
  speed = 1,
  borderColor = 'rgba(255,255,255,0.08)',
  squareSize = 40,
  hoverFillColor = 'rgba(255,255,255,0.08)',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestRef = useRef<number | null>(null);

  const ctxRef =
    useRef<CanvasRenderingContext2D | null>(null);

  const gridOffsetRef = useRef({
    x: 0,
    y: 0,
  });

  const hoveredSquareRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawGrid();
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;

    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const offsetX =
      gridOffsetRef.current.x % squareSize;

    const offsetY =
      gridOffsetRef.current.y % squareSize;

    for (
      let x = -squareSize;
      x < canvas.width + squareSize;
      x += squareSize
    ) {
      for (
        let y = -squareSize;
        y < canvas.height + squareSize;
        y += squareSize
      ) {
        const squareX = x - offsetX;

        const squareY = y - offsetY;

        const cellX = Math.floor(
          (squareX + offsetX) / squareSize
        );

        const cellY = Math.floor(
          (squareY + offsetY) / squareSize
        );

        if (
          hoveredSquareRef.current &&
          cellX ===
            hoveredSquareRef.current.x &&
          cellY ===
            hoveredSquareRef.current.y
        ) {
          ctx.fillStyle =
            hoverFillColor;

          ctx.fillRect(
            squareX,
            squareY,
            squareSize,
            squareSize
          );
        }

        ctx.strokeStyle = borderColor;

        ctx.strokeRect(
          squareX,
          squareY,
          squareSize,
          squareSize
        );
      }
    }

    // Gradient elegante
    const gradient =
      ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(
          canvas.width ** 2 +
            canvas.height ** 2
        ) / 2
      );

    gradient.addColorStop(
      0,
      'rgba(0,0,0,0)'
    );

    gradient.addColorStop(
      1,
      'rgba(10,6,20,0.45)'
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const updateAnimation = () => {
    const effectiveSpeed =
      speed * 0.08;

    switch (direction) {
      case 'right':
        gridOffsetRef.current.x +=
          effectiveSpeed;
        break;

      case 'left':
        gridOffsetRef.current.x -=
          effectiveSpeed;
        break;

      case 'up':
        gridOffsetRef.current.y -=
          effectiveSpeed;
        break;

      case 'down':
        gridOffsetRef.current.y +=
          effectiveSpeed;
        break;

      case 'diagonal':
        gridOffsetRef.current.x +=
          effectiveSpeed;

        gridOffsetRef.current.y +=
          effectiveSpeed;
        break;
    }

    drawGrid();

    requestRef.current =
      requestAnimationFrame(
        updateAnimation
      );
  };

  const handleMouseMove = (
    event: MouseEvent
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const mouseY =
      event.clientY - rect.top;

    const offsetX =
      gridOffsetRef.current.x %
      squareSize;

    const offsetY =
      gridOffsetRef.current.y %
      squareSize;

    const hoveredSquareX =
      Math.floor(
        (mouseX + offsetX) /
          squareSize
      );

    const hoveredSquareY =
      Math.floor(
        (mouseY + offsetY) /
          squareSize
      );

    hoveredSquareRef.current = {
      x: hoveredSquareX,
      y: hoveredSquareY,
    };
  };

  const handleMouseLeave = () => {
    hoveredSquareRef.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    ctxRef.current =
      canvas.getContext('2d');

    resizeCanvas();

    canvas.addEventListener(
      'mousemove',
      handleMouseMove
    );

    canvas.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    window.addEventListener(
      'resize',
      resizeCanvas
    );

    requestRef.current =
      requestAnimationFrame(
        updateAnimation
      );

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(
          requestRef.current
        );
      }

      canvas.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      canvas.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      window.removeEventListener(
        'resize',
        resizeCanvas
      );
    };
  }, [
    direction,
    speed,
    squareSize,
    borderColor,
    hoverFillColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block border-none"
    />
  );
}


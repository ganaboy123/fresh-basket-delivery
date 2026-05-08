'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DEFAULT_GRADIENTS = [
  'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
  'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
  'linear-gradient(135deg, #0f3460 0%, #e94560 100%)',
  'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
  'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
];

export function GradientBackground({
  children,
  className = '',
  gradients = DEFAULT_GRADIENTS,
  animationDuration = 8,
  animationDelay = 0.5,
  enableCenterContent = false,
  overlay = false,
  overlayOpacity = 0.3,
  ...props
}) {
  return (
    <div
      className={cn('gradient-bg-root', className)}
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradients[0],
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
        animate={{ background: gradients }}
        transition={{
          delay: animationDelay,
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: overlayOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {children && (
        <div
          style={
            enableCenterContent
              ? {
                  position: 'relative',
                  zIndex: 10,
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : { position: 'relative', zIndex: 10 }
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}

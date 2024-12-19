import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import LottieAnimation from './LottieAnimation'
import horseAnimation from '../animations/Animation - 1734466915257.json'

export function BackgroundAnimations() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const controls = useAnimation()

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize position
  useEffect(() => {
    const padding = 100
    const initialPosition = {
      x: -padding,
      y: dimensions.height * 0.75 // Position at 75% of screen height
    }
    setPosition(initialPosition)
  }, [dimensions.height, dimensions.width])

  // Animate horse
  useEffect(() => {
    let isAnimating = true

    const animateHorse = async () => {
      const padding = 100
      const duration = 15

      while (isAnimating) {
        // Animate to right edge
        await controls.start({
          x: dimensions.width + padding,
          y: position.y,
          transition: {
            duration: duration,
            ease: "linear"
          }
        })

        // Quick reset to left side (no animation)
        await controls.set({
          x: -padding,
          y: position.y
        })
      }
    }

    animateHorse()

    return () => {
      isAnimating = false
      controls.stop()
    }
  }, [dimensions.width, controls, position.y])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="horse-container"
        animate={controls}
        initial={{ x: position.x, y: position.y }}
      >
        <div 
          style={{ 
            transform: 'scaleX(-1)', // Flip horizontally to face right
            opacity: 0.4,
            position: 'relative',
            width: '300px', // Doubled size
            height: '300px' // Doubled size
          }}
        >
          <LottieAnimation
            animationData={horseAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

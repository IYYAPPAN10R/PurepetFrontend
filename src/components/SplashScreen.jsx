import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SplashLogo({ size = 100 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="9" fill="url(#splashGrad)" />
            <path d="M18 7C18 7 12 12 12 19C12 22.866 14.686 26 18 26C21.314 26 24 22.866 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.9" />
            <path d="M18 7C18 7 16 14 20 18C21.5 19.5 22 21 21 23C22.8 21.5 24 20.3 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.3" />
            <defs>
                <linearGradient id="splashGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1a6fd4" />
                    <stop offset="1" stopColor="#0ea5e9" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default function SplashScreen({ onComplete }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        // Show for 1.8s total, then fade out
        const timer = setTimeout(() => setVisible(false), 1800)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {visible && (
                <motion.div
                    key="splash-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(26,111,212,0.12) 0%, transparent 65%), #f0f6ff',
                        overflow: 'hidden',
                    }}
                >
                    {/* Ambient glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            width: 380,
                            height: 380,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(26,111,212,0.12) 0%, transparent 70%)',
                            filter: 'blur(50px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <SplashLogo size={110} />
                    </motion.div>

                    {/* Company name */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
                        style={{ marginTop: 22, textAlign: 'center', position: 'relative', zIndex: 1 }}
                    >
                        <div style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 800,
                            fontSize: 'clamp(1.7rem, 5vw, 2.5rem)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #1a6fd4, #0ea5e9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>Pure</span>
                            <span style={{ color: '#0f172a' }}>Pet</span>
                            <span style={{
                                display: 'block',
                                color: '#475569',
                                fontWeight: 400,
                                fontSize: '0.5em',
                                letterSpacing: '0.08em',
                                marginTop: 4,
                            }}>Solutions</span>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.55 }}
                            style={{
                                marginTop: 12,
                                fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                                color: '#475569',
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            Premium PET Bottle Manufacturing
                        </motion.p>
                    </motion.div>

                    {/* Loading bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        style={{
                            position: 'absolute',
                            bottom: 52,
                            width: 150,
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: 2,
                            background: 'rgba(26,111,212,0.12)',
                            borderRadius: 99,
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: 'easeInOut' }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #1a6fd4, #0ea5e9)',
                                    borderRadius: 99,
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../utils/api'

// Fallback images strictly matching Products display for unified visual branding
import roundBottle1 from '../images/round_bottle_v1.png'
import roundBottle2 from '../images/round_bottle_v2.png'
import squareBottle from '../images/square-bottle-v1.png'
import juiceBottle from '../images/juice-bottle-v1.png'
import customImg from '../images/custom-solutions.png'
import defaultImg from '../images/bottles-v0.png'

const FALLBACK_IMAGES = {
    water: roundBottle1,
    beverage: juiceBottle,
    pharma: roundBottle2,
    food: squareBottle,
    chemical: squareBottle,
    custom: customImg,
}
const INITIAL_MSG = {
    from: 'bot',
    text: '👋 Hi! I\'m PurePet Assistant. Ask me about our products, pricing, sustainability, or anything else!',
}

function Chatbot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([INITIAL_MSG])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)
    const navigate = useNavigate()
    const { addToCart } = useCart()

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        const text = input.trim()
        if (!text || loading) return

        setMessages(prev => [...prev, { from: 'user', text }])
        setInput('')
        setLoading(true)

        try {
            const { data } = await api.post('/ai/chat', { message: text })
            setMessages(prev => [...prev, { from: 'bot', text: data.response, products: data.products }])
        } catch {
            setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I encountered an error. Please try again!' }])
        } finally {
            setLoading(false)
        }
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
    }

    const handleAddToCart = (product) => {
        addToCart(product);
        // Add a temporary confirmed message
        setMessages(prev => [...prev, { from: 'bot', text: `✅ Just added ${product.name} to your cart!` }]);
    }

    return (
        <>
            <button className="chatbot-toggle" onClick={() => setOpen(!open)} aria-label="Toggle chatbot">
                {open ? '✕' : '💬'}
            </button>

            {open && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
                            <div>
                                <h4>PurePet Assistant</h4>
                                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>● Online</p>
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-msg ${msg.from}`}>
                                <div className="chat-bubble">
                                    <span style={{ display: 'block', whiteSpace: 'pre-wrap' }}>{msg.text}</span>

                                    {msg.products && msg.products.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 12 }}>
                                            {msg.products.map(product => (
                                                <div key={product._id} className="chat-product-card" style={{
                                                    background: msg.from === 'bot' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                                                    padding: 12,
                                                    borderRadius: 8,
                                                    color: msg.from === 'bot' ? 'var(--text)' : '#fff',
                                                    border: '1px solid rgba(0,0,0,0.1)'
                                                }}>
                                                    <img src={product.image || FALLBACK_IMAGES[product.category] || defaultImg} alt={product.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6, backgroundColor: '#f0f0f0' }} />
                                                    <h5 style={{ margin: '10px 0 4px', fontSize: 14 }}>{product.name}</h5>
                                                    <p style={{ margin: '0 0 6px', fontSize: 12, opacity: 0.8 }}>
                                                        {product.capacity} | {product.color || 'Clear'} | {product.dimensions ? product.dimensions : 'Standard'}
                                                    </p>
                                                    <div style={{ fontSize: 14, marginBottom: 8, fontWeight: 'bold', color: 'var(--primary)' }}>₹{product.price}</div>

                                                    <ul style={{ paddingLeft: 18, margin: '0 0 12px', fontSize: 12, opacity: 0.9 }}>
                                                        {product.features?.slice(0, 3).map((f, idx) => <li key={idx} style={{ marginBottom: 4 }}>{f}</li>)}
                                                    </ul>

                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button
                                                            style={{ flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 'bold', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', transition: '0.2s' }}
                                                            onClick={() => handleAddToCart(product)}
                                                            onMouseOver={(e) => e.target.style.opacity = 0.9}
                                                            onMouseOut={(e) => e.target.style.opacity = 1}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <button
                                                            style={{ flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 'bold', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 4, cursor: 'pointer', transition: '0.2s' }}
                                                            onClick={() => navigate(`/product/${product._id}`)}
                                                            onMouseOver={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = '#fff'; }}
                                                            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--primary)'; }}
                                                        >
                                                            View Product
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-msg bot">
                                <div className="chat-bubble" style={{ color: 'var(--text-muted)' }}>
                                    <span style={{ animation: 'pulse 1s infinite' }}>Typing…</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="chatbot-input-row">
                        <input
                            className="chatbot-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask about a product..."
                            disabled={loading}
                        />
                        <button className="chatbot-send" onClick={sendMessage} disabled={loading}>➤</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chatbot

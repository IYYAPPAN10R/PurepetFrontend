import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

// Fallbacks
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

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart, cart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [imgSrc, setImgSrc] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`)
                setProduct(data.product)
                setImgSrc(
                    data.product.image && data.product.image.trim() !== ''
                        ? data.product.image
                        : (FALLBACK_IMAGES[data.product.category] || defaultImg)
                )
            } catch (err) {
                setError('Failed to fetch product details.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product)
        toast.success(`${product.name} added to cart!`, { duration: 2000 })
    }

    if (loading) return <div style={{ padding: '100px 0' }}><LoadingSpinner /></div>

    if (error || !product) return (
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2>Product Not Found</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We couldn't find the product you're looking for.</p>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/products')}>Browse Products</button>
        </div>
    )

    const inCart = cart.some(i => i.product._id === product._id)

    return (
        <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <button className="btn btn-secondary btn-sm" style={{ marginBottom: 30 }} onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }} className="product-detail-grid">
                <div style={{
                    background: '#f8f9fa',
                    borderRadius: 12,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--bg-border)'
                }}>
                    <img
                        src={imgSrc}
                        alt={product.name}
                        style={{ width: '100%', maxHeight: 600, objectFit: 'contain' }}
                        onError={() => setImgSrc(FALLBACK_IMAGES[product.category] || defaultImg)}
                    />
                </div>

                <div>
                    <span className="badge badge-green" style={{ textTransform: 'capitalize', marginBottom: 16, display: 'inline-block' }}>
                        {product.category}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>{product.name}</h1>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: 20 }}>
                        ₹{product.price || 199}
                    </div>

                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 30 }}>
                        {product.capacity && (
                            <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, border: '1px solid var(--bg-border)' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Capacity</div>
                                <div style={{ fontWeight: 'bold' }}>{product.capacity}</div>
                            </div>
                        )}
                        {product.color && (
                            <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, border: '1px solid var(--bg-border)' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Color</div>
                                <div style={{ fontWeight: 'bold' }}>{product.color}</div>
                            </div>
                        )}
                        {product.material && (
                            <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, border: '1px solid var(--bg-border)' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Material</div>
                                <div style={{ fontWeight: 'bold' }}>{product.material}</div>
                            </div>
                        )}
                        {product.dimensions && (
                            <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, border: '1px solid var(--bg-border)' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Dimensions</div>
                                <div style={{ fontWeight: 'bold' }}>{product.dimensions}</div>
                            </div>
                        )}
                    </div>

                    {product.features && product.features.length > 0 && (
                        <div style={{ marginBottom: 32 }}>
                            <h3 style={{ marginBottom: 12, fontSize: 18 }}>Key Features</h3>
                            <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
                                {product.features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div style={{ marginBottom: 20 }}>
                        <span className="badge" style={{ 
                            background: product.countInStock > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: product.countInStock > 0 ? '#10b981' : '#ef4444',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: '600',
                            fontSize: '14px',
                            border: `1px solid ${product.countInStock > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                        }}>
                            {product.countInStock > 0 ? `● In Stock (${product.countInStock} available)` : '● Out of Stock - Back Soon!'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <button
                            className={`btn ${inCart ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ flex: 1, padding: '16px', fontSize: 16 }}
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            {!product.inStock ? 'Out of Stock' : inCart ? '✓ In Cart - Add More' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
            {/* simple responsive style */}
            <style>{`
                @media (max-width: 768px) {
                    .product-detail-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProductDetail

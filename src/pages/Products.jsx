import { useState, useEffect, useCallback } from 'react'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

// Fallback images mapped by category (used when product has no image URL)
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

const CATEGORIES = ['all', 'water', 'beverage', 'pharma', 'food', 'chemical', 'custom']

const CATEGORY_LABELS = {
    all: 'All Products',
    water: 'Water',
    beverage: 'Beverage',
    pharma: 'Pharma',
    food: 'Food',
    chemical: 'Chemical',
    custom: 'Custom',
}

// Product image: uses product.image URL if available, else category fallback
function ProductImage({ product }) {
    const [imgSrc, setImgSrc] = useState(
        product.image && product.image.trim() !== ''
            ? product.image
            : FALLBACK_IMAGES[product.category] || defaultImg
    )
    const [errored, setErrored] = useState(false)

    const handleError = () => {
        if (!errored) {
            setErrored(true)
            setImgSrc(FALLBACK_IMAGES[product.category] || defaultImg)
        }
    }

    return (
        <div className="image-container">
            <img
                src={imgSrc}
                alt={product.name}
                className="product-img"
                onError={handleError}
            />
            {/* Bottom fade overlay — blends image into card */}
            <div className="image-overlay" />
            {/* Category badge */}
            <span
                className="badge badge-green"
                style={{ top: 12, left: 12, textTransform: 'capitalize' }}
            >
                {CATEGORY_LABELS[product.category] || product.category}
            </span>
            {/* Out of stock badge */}
            {!product.inStock && (
                <span
                    className="badge badge-gray"
                    style={{ top: 12, right: 12 }}
                >
                    Out of Stock
                </span>
            )}
        </div>
    )
}

function ProductCard({ product }) {
    const { addToCart, cart } = useCart()
    const [added, setAdded] = useState(false)
    const inCart = cart.some(i => i.product._id === product._id)

    const handleAddToCart = () => {
        addToCart(product)
        toast.success(`${product.name} added to cart!`, { duration: 2000 })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="product-card">
            <ProductImage product={product} />
            <div className="product-body">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-capacity">
                    <span className="product-capacity-dot" />
                    {product.capacity}
                </p>
                <p className="product-desc">{product.description}</p>
                <div className="product-features">
                    {(product.features || []).slice(0, 3).map(f => (
                        <span key={f} className="badge badge-blue">{f}</span>
                    ))}
                </div>
                <div className="product-meta">
                    <div className="product-material">
                        {product.material && (
                            <span>{product.material.split('(')[0].trim()}</span>
                        )}
                    </div>
                    <span className="stock-indicator">
                        <span className={`stock-dot ${product.inStock ? 'in' : 'out'}`} />
                        <span style={{ color: product.inStock ? 'var(--success)' : 'var(--text-muted)' }}>
                            {product.inStock ? `In Stock (${product.countInStock})` : `Out of Stock (${product.countInStock})`}
                        </span>
                    </span>
                </div>
                <button
                    className={`btn add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    style={{ marginTop: 14, width: '100%' }}
                >
                    {!product.inStock ? 'Out of Stock' : added ? '✓ Added to Cart!' : inCart ? '+ Add More' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = { page, limit: 9 }
            if (search) params.search = search
            if (category !== 'all') params.category = category
            const { data } = await api.get('/products', { params })
            setProducts(data.products)
            setTotal(data.total)
            setPages(data.pages)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [search, category, page])

    useEffect(() => {
        setPage(1)
    }, [search, category])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <>
            <div className="page-hero">
                <div className="container">
                    <div className="section-tag">Product Catalog</div>
                    <h1 className="page-hero-title">Our <span className="gradient-text">PET Bottle Range</span></h1>
                    <p className="page-hero-subtitle">
                        Explore our comprehensive range of FDA-grade PET bottles for every industry and application.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Search Bar */}
                    <div className="filter-bar">
                        <input
                            className="form-input filter-input"
                            placeholder="Search products by name or description..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <div style={{ fontSize: 14, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                            {total} product{total !== 1 ? 's' : ''} found
                        </div>
                    </div>

                    {/* Category Chip Buttons */}
                    <div className="category-chips">
                        {CATEGORIES.map(c => (
                            <button
                                key={c}
                                className={`chip-btn ${category === c ? 'active' : ''}`}
                                onClick={() => setCategory(c)}
                            >
                                {CATEGORY_LABELS[c]}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div style={{ padding: '80px 0' }}><LoadingSpinner /></div>
                    ) : products.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
                            <div style={{
                                width: 72, height: 72,
                                background: 'var(--bg-card)',
                                border: '1px solid var(--bg-border)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px',
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                            <h3 style={{ marginBottom: 8 }}>No products found</h3>
                            <p>Try adjusting your search or selecting a different category.</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map(p => <ProductCard key={p._id} product={p} />)}
                        </div>
                    )}

                    {/* Pagination */}
                    {pages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 48 }}>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                ← Prev
                            </button>
                            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setPage(p => Math.min(pages, p + 1))}
                                disabled={page === pages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Products

function LoadingSpinner({ fullScreen = false, size = 48 }) {
    return (
        <div className={`spinner-wrapper ${fullScreen ? 'full-screen' : ''}`}>
            <div
                className="spinner"
                style={{ width: size, height: size }}
            />
            {fullScreen && (
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 16 }}>
                    Loading PurePet Solutions…
                </p>
            )}
        </div>
    )
}

export default LoadingSpinner

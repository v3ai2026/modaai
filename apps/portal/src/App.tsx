import React from 'react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#020202',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠 MODA AI Platform</h1>
      <p style={{ fontSize: '1.5rem', color: '#8ab4f8' }}>Welcome to the Portal</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a href="/moda-studio" style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#8ab4f8', 
          color: '#020202', 
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontWeight: 'bold'
        }}>
          MODA Studio
        </a>
        <a href="/vision-commerce" style={{ 
          padding: '0.75rem 1.5rem', 
          border: '1px solid #8ab4f8', 
          color: '#8ab4f8', 
          textDecoration: 'none',
          borderRadius: '0.5rem'
        }}>
          Vision Commerce
        </a>
      </div>
    </div>
  )
}

export default App

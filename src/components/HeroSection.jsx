import React, { useState } from 'react';

// ============================================
// DOT PATTERN COMPONENT
// 3x3 grid of light green dots for decoration
// ============================================
const DotPattern = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    {[...Array(3)].map((_, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[...Array(3)].map((_, j) => (
          <div 
            key={j} 
            style={{
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              backgroundColor: '#6FCF97'
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

// ============================================
// MAIN HERO BANNER COMPONENT
// Simple two-panel layout: Text left, Image right
// ============================================
const HeroBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff'
    }}>
      
      {/* ============================================
          LEFT PANEL - TEXT CONTENT ONLY
          Plain white background, no diagonal cuts
          Width: 603px (41.875% of 1440px total)
          ============================================ */}
      <div style={{ 
        position: 'relative', 
        width: '603px',
        minWidth: '603px',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 40px'
      }}>
        
        {/* TOP-LEFT DOT PATTERN */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          opacity: 0.4
        }}>
          <DotPattern />
        </div>

        {/* TEXT CONTENT CONTAINER */}
        <div style={{
          maxWidth: '600px'
        }}>
          
          {/* Green Badge - NATURAL IMMUNOTHERAPY */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#6FCF97',
            padding: '6px 12px',
            borderRadius: '4px',
            marginBottom: '32px'
          }}>
            <span style={{
              color: '#fff',
              fontFamily: 'sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              NATURAL IMMUNOTHERAPY
            </span>
          </div>

          {/* Headline 1 - Empowering lives */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: 1.2,
            color: '#000',
            margin: '0 0 4px 0'
          }}>
            Empowering lives,
          </h1>

          {/* Headline 2 - Saving futures */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '40px',
            lineHeight: 1.2,
            color: '#6FCF97',
            margin: '0 0 24px 0'
          }}>
            Saving futures
          </h2>

          {/* Tagline - Fighting to make a CANCER FREE WORLD */}
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            margin: '0 0 32px 0'
          }}>
            <span style={{ color: '#000' }}>Fighting to make a </span>
            <span style={{ color: '#2D5BFF', fontWeight: 700 }}>
              CANCER FREE WORLD
            </span>
          </p>

          {/* CTA Button - DISCOVER */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: '#6FCF97',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isHovered 
                ? '0 6px 16px rgba(111, 207, 151, 0.4)' 
                : '0 2px 8px rgba(111, 207, 151, 0.2)'
            }}
          >
            DISCOVER
          </button>
        </div>

        {/* BOTTOM-RIGHT DOT PATTERN */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          opacity: 0.4
        }}>
          <DotPattern />
        </div>
      </div>

      {/* ============================================
          RIGHT PANEL - COMBINED IMAGE
          Width: 837px (58.125% of 1440px total)
          Single image container for your composite image
          This will hold the combined triangular image with:
          - Orange gradient triangle (top-left to middle-right)
          - Calendar/coffee/shoes triangle (top-right)
          - Lower section triangle (bottom-right)
          ============================================ */}
      <div style={{ 
        position: 'relative', 
        width: '837px',
        minWidth: '837px',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
      }}>
        
        {/* COMBINED IMAGE PLACEHOLDER
            Replace this div with: <img src="your-combined-image.jpg" alt="Hero" style={{...}} />
            Your combined image should include:
            1. The diagonal white cut from left
            2. Orange gradient triangle behind text area
            3. Top image triangle (calendar, coffee, shoes)
            4. Bottom image triangle (continuation)
        */}
        <div 
          className="combined-img-placeholder"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFA500 0%, #E8E8E8 40%, #C0C0C0 70%)',
            position: 'relative'
          }}
        >
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            maxWidth: '400px'
          }}>
            <span style={{
              color: '#333',
              fontSize: '16px',
              fontWeight: 600,
              display: 'block',
              marginBottom: '12px'
            }}>
              [COMBINED IMAGE PLACEHOLDER]
            </span>
            <span style={{
              color: '#666',
              fontSize: '13px',
              lineHeight: 1.6,
              display: 'block'
            }}>
              Replace this div with your combined image that includes:<br/>
              • Orange diagonal triangle (left side)<br/>
              • Top photo triangle (top-right)<br/>
              • Bottom photo triangle (bottom-right)<br/><br/>
              Use: &lt;img src="hero-combined.jpg" alt="Hero" style=&#123;&#123;width: '100%', height: '100%', objectFit: 'cover'&#125;&#125; /&gt;
            </span>
          </div>

          {/* BOTTOM-RIGHT DOT PATTERN (optional - can be in image) */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            opacity: 0.4,
            zIndex: 2
          }}>
            <DotPattern />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
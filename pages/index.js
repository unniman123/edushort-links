import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  // Function to redirect to Play Store
  const goToPlayStore = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.ajilkojilgokulravi.unniman';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Head>
        <title>Edushorts - Educational News in Short Format</title>
        <meta name="description" content="Get educational news in short, easy-to-digest formats with Edushorts" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{
        maxWidth: '500px',
        width: '100%',
      }}>
        <div style={{
          marginBottom: '30px',
        }}>
          <img
            src="/logo.png"
            alt="Edushorts Logo"
            style={{
              width: '100px',
              height: '100px',
              marginBottom: '20px',
            }}
          />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#4285F4', // Replace with your brand color
            margin: '0 0 15px 0',
          }}>
            Edushorts
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            margin: '0 0 30px 0',
            lineHeight: '1.5',
          }}>
            Educational news in short format
          </p>
        </div>

        <button
          onClick={goToPlayStore}
          style={{
            backgroundColor: '#4285F4', // Replace with your brand color
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367d6'} // Darker shade on hover
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285F4'} // Back to original on mouse out
        >
          Download Edushorts
        </button>
      </main>

      <footer style={{
        marginTop: 'auto',
        padding: '20px 0',
        color: '#666',
        fontSize: '0.9rem',
      }}>
        <p>© {new Date().getFullYear()} Edushorts. All rights reserved.</p>
      </footer>
    </div>
  );
}
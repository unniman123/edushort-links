import Head from 'next/head';
import Link from 'next/link';

export default function AppComingSoon() {
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
        <title>Edushorts - Coming Soon to Play Store</title>
        <meta name="description" content="Edushorts will be available soon on Google Play Store. Stay tuned for educational news in short format!" />
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
            fontSize: '2.2rem',
            fontWeight: '600',
            color: '#4285F4', // Replace with your brand color
            margin: '0 0 15px 0',
          }}>
            Coming Soon to Play Store
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 15px 0',
            lineHeight: '1.5',
          }}>
            Edushorts is currently in development and will be available on the Google Play Store soon.
          </p>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 30px 0',
            lineHeight: '1.5',
          }}>
            Get ready for educational news in short, easy-to-digest formats!
          </p>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: '#333',
            margin: '0 0 15px 0',
          }}>
            What to expect in Edushorts:
          </h2>
          <ul style={{
            textAlign: 'left',
            paddingLeft: '20px',
            margin: '0',
            color: '#555',
          }}>
            <li style={{ marginBottom: '8px' }}>Educational news in concise format</li>
            <li style={{ marginBottom: '8px' }}>Easy bookmarking for later reading</li>
            <li style={{ marginBottom: '8px' }}>Share interesting articles with friends</li>
            <li style={{ marginBottom: '0' }}>Stay updated with the latest in education</li>
          </ul>
        </div>

        <Link href="/" passHref>
          <a style={{
            color: '#4285F4', // Replace with your brand color
            textDecoration: 'none',
            fontSize: '1rem',
          }}>
            Return to Homepage
          </a>
        </Link>
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
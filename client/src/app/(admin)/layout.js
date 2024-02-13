import Navbar from '@/components/navbar/page'
export default function RootLayout({
    children,
  }) {
    return (
      <html lang="en">
        <body>
            
            {children}</body>
      </html>
    )
  }
import Sidebar from '@/components/sidebar/page'
import NavBar from '@/components/navbar/page'


export default function RootLayout({
    children,
  }) {
    return (
      <html lang="en">
        <body>
            <NavBar/>
             <div className="p-4">{children}</div>
          </body>
      </html>
    )
  }
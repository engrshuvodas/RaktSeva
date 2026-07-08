import './globals.css';

export const metadata = {
  title: 'RaktSeva - Every Drop, A New Life',
  description: 'RaktSeva connects blood requesters with eligible donors nearby. Affiliated with Parul Sevashram Hospital, Vadodara. Donate Blood, Donate Hope.',
  keywords: 'blood bank, blood donation, RaktSeva, Vadodara, Gujarat, Parul Sevashram Hospital',
  openGraph: {
    title: 'RaktSeva - Every Drop, A New Life',
    description: 'Donate Blood, Donate Hope. Connect with nearby donors instantly.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

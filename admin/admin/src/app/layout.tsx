import clsx from 'clsx';
import styles from './layout.module.scss';
export const metadata = {
  title: 'Admin',
  description: 'Admin page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(styles.Layout)}>
        {children}
        </body>
    </html>
  )
}

import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Animal Foundation is dedicated to improving animal welfare through technology and community engagement.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/report" className="hover:underline">
                  Report an Animal
                </Link>
              </li>
              <li>
                <Link href="/adopt" className="hover:underline">
                  Adopt an Animal
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:underline">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/collaborations" className="hover:underline">
                  Collaborations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 Animal Foundation. All rights reserved.</p>
          <p>
            Powered by <a href="https://aaradhyadhrma.life/" className="hover:underline text-primary-accent" target="_blank">Aaradhya Dharma</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

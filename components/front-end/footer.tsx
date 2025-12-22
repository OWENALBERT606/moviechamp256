// import { Facebook, Instagram, Youtube, MessageCircle, Music } from "lucide-react"
// import Link from "next/link"

// export function Footer() {
//   return (
//     <footer className="bg-gradient-to-b from-background to-navy-dark border-t border-golden/20 mt-20">
//       <div className="px-4 md:px-8 lg:px-12 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Contact Details */}
//           <div className="space-y-4">
//             <h3 className="text-golden font-semibold text-lg mb-4">Contact Us</h3>
//             <div className="space-y-2 text-sm text-muted-foreground">
//               <p>Email: support@moviechamp.com</p>
//               <p>Phone: +1 (555) 123-4567</p>
//               <p>Address: 123 Cinema Street</p>
//               <p>Los Angeles, CA 90028</p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-golden font-semibold text-lg mb-4">Quick Links</h3>
//             <div className="space-y-2 text-sm">
//               <Link href="/mobile" className="block text-muted-foreground hover:text-golden transition-colors">
//                 Mobile App
//               </Link>
//               <Link href="/about" className="block text-muted-foreground hover:text-golden transition-colors">
//                 About Us
//               </Link>
//               <Link href="/help" className="block text-muted-foreground hover:text-golden transition-colors">
//                 Help Center
//               </Link>
//               <Link href="/terms" className="block text-muted-foreground hover:text-golden transition-colors">
//                 Terms of Service
//               </Link>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="space-y-4">
//             <h3 className="text-golden font-semibold text-lg mb-4">Follow Us</h3>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-navy-light hover:bg-golden/20 border border-golden/30 hover:border-golden flex items-center justify-center transition-all duration-300 group"
//               >
//                 <Facebook className="w-5 h-5 text-golden group-hover:scale-110 transition-transform" />
//               </Link>
//               <Link
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-navy-light hover:bg-golden/20 border border-golden/30 hover:border-golden flex items-center justify-center transition-all duration-300 group"
//               >
//                 <Instagram className="w-5 h-5 text-golden group-hover:scale-110 transition-transform" />
//               </Link>
//               <Link
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-navy-light hover:bg-golden/20 border border-golden/30 hover:border-golden flex items-center justify-center transition-all duration-300 group"
//               >
//                 <Youtube className="w-5 h-5 text-golden group-hover:scale-110 transition-transform" />
//               </Link>
//               <Link
//                 href="https://tiktok.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-navy-light hover:bg-golden/20 border border-golden/30 hover:border-golden flex items-center justify-center transition-all duration-300 group"
//               >
//                 <Music className="w-5 h-5 text-golden group-hover:scale-110 transition-transform" />
//               </Link>
//               <Link
//                 href="https://wa.me/15551234567"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-navy-light hover:bg-golden/20 border border-golden/30 hover:border-golden flex items-center justify-center transition-all duration-300 group"
//               >
//                 <MessageCircle className="w-5 h-5 text-golden group-hover:scale-110 transition-transform" />
//               </Link>
//             </div>
//           </div>

//           {/* Download App */}
//           <div className="space-y-4">
//             <h3 className="text-golden font-semibold text-lg mb-4">Get the App</h3>
//             <p className="text-sm text-muted-foreground mb-4">Watch movies on the go with our mobile app</p>
//             <Link
//               href="/mobile"
//               className="inline-block px-6 py-2.5 bg-gradient-to-r from-golden to-golden-light text-navy-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-golden/30 transition-all duration-300 text-sm"
//             >
//               Download Now
//             </Link>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 border-t border-golden/20 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-sm text-muted-foreground">© 2025 Movie Champ. All rights reserved.</p>
//           <p className="text-sm text-muted-foreground flex items-center gap-2">
//             Designed by <span className="text-golden font-semibold">Owen</span> with{" "}
//             <span className="text-red-500 animate-pulse">♥</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }




import { Facebook, Instagram, Youtube, MessageCircle, Music, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background via-slate-950 to-black border-t border-orange-500/20 mt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 animate-pulse" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative px-4 md:px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Image
                    src="/logo-movie- champ.jpg"
                    alt="MovieChamp256"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                MovieChamp256
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate destination for unlimited movies, series, and entertainment. Stream in HD, download offline, and enjoy ad-free content.
            </p>
            {/* App Badges */}
            <div className="flex flex-col gap-3">
              <Link
                href="/mobile"
                className="group flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Download on the</p>
                  <p className="text-sm font-semibold text-foreground">App Store</p>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/mobile"
                className="group flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Get it on</p>
                  <p className="text-sm font-semibold text-foreground">Google Play</p>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-300 rounded-full" />
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { href: "/movies", label: "Browse Movies" },
                { href: "/series", label: "TV Series" },
                { href: "/pricing", label: "Pricing Plans" },
                { href: "/about", label: "About Us" },
                { href: "/help", label: "Help Center" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-300 rounded-full" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:support@moviechamp256.com"
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-1">Email</p>
                  <p className="font-medium">support@moviechamp256.com</p>
                </div>
              </a>

              <a 
                href="tel:+256700000000"
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-1">Phone</p>
                  <p className="font-medium">+256 700 000 000</p>
                </div>
              </a>

              <div className="group flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-1">Location</p>
                  <p className="font-medium">Kampala, Uganda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-300 rounded-full" />
              Stay Connected
            </h3>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Subscribe to get updates on new releases
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Follow us on social media</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-500/20 hover:border-blue-500" },
                  { Icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-500/20 hover:border-pink-500" },
                  { Icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-500/20 hover:border-red-500" },
                  { Icon: Music, href: "https://tiktok.com", color: "hover:bg-cyan-500/20 hover:border-cyan-500" },
                  { Icon: MessageCircle, href: "https://wa.me/256700000000", color: "hover:bg-green-500/20 hover:border-green-500" },
                ].map(({ Icon, href, color }, index) => (
                  <Link
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 ${color} flex items-center justify-center transition-all duration-300 hover:scale-110`}
                  >
                    <Icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-orange-500/20" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-xs text-muted-foreground">
              Trusted by thousands of movie lovers
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-orange-500 transition-colors">
              Terms
            </Link>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">
              Privacy
            </Link>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <Link href="/cookies" className="hover:text-orange-500 transition-colors">
              Cookies
            </Link>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <p>© 2025 MovieChamp256. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Owen
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-orange-500/10">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-xs text-muted-foreground">🔒 Secure Payments</div>
            <div className="text-xs text-muted-foreground">📱 Mobile Money Accepted</div>
            <div className="text-xs text-muted-foreground">💳 Card Payments</div>
            <div className="text-xs text-muted-foreground">⚡ Instant Activation</div>
            <div className="text-xs text-muted-foreground">🎬 HD & 4K Quality</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
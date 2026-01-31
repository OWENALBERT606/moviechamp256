import { Facebook, Instagram, Youtube, MessageCircle, Music, Mail, Phone, MapPin, ArrowRight, Heart, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
              <Image
                           src="/logo/unnamed (3).jpg"
                           alt="Logo"
                           width={80}
                           height={20}
                           className="h-10 w-40"
                         />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every frame, your way. Your ultimate destination for unlimited movies, series, and entertainment. Stream in HD and enjoy ad-free content anywhere.
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
              Explore
            </h3>
            <div className="space-y-3">
              {[
                { href: "/movies", label: "Movies" },
                { href: "/series", label: "TV Shows" },
                { href: "/trending", label: "Trending" },
                { href: "/about", label: "Our Story" },
                { href: "/help", label: "Help Center" },
                { href: "/terms", label: "Terms of Service" },
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
                href="mailto:support@flickerplay.com"
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-1">Email</p>
                  <p className="font-medium">support@flickerplay.com</p>
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

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-orange-500/20">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <p>© 2026 FlickerPlay. All rights reserved.</p>
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
      </div>
    </footer>
  )
}
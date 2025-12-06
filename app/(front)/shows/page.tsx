import ComingSoonPage from "@/components/coming-soon"

export const metadata = {
  title: "TV Shows - Coming Soon | Movie Mania",
  description: "TV Shows feature coming soon to Movie Mania",
}

export default function TVShowsComingSoon() {
  return (
    <ComingSoonPage
      featureName="TV Shows"
      description="Binge-watch your favorite TV series. We're working to bring you an amazing collection of shows and series."
      returnLink="/"
    />
  )
}

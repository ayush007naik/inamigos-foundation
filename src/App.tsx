import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ThemeProvider } from '@/hooks/useTheme'
import Home from '@/pages/Home'
import Causes from '@/pages/Causes'
import About from '@/pages/About'
import Volunteers from '@/pages/Volunteers'
import Gallery from '@/pages/Gallery'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Events from '@/pages/Events'
import EventDetail from '@/pages/EventDetail'
import Contact from '@/pages/Contact'
import VolunteerApply from '@/pages/VolunteerApply'
import NotFound from '@/pages/NotFound'

export default function App() {
  const base = import.meta.env.BASE_URL || '/'
  const basename = base === '/' ? '/' : base.replace(/\/$/, '')

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="causes" element={<Causes />} />
            <Route path="about" element={<About />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:slug" element={<EventDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="volunteer" element={<VolunteerApply />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

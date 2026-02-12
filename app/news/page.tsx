import { getNews } from '@/lib/microcms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import './styles.css'

/**
 * 純粋関数: 日付フォーマット
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * ニュースページ
 */
export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="news-page">
      <Header />
      
      <main className="news-main">
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal>
            <h1 className="news-title">お知らせ</h1>
            <p className="news-subtitle">学園からの最新情報</p>
          </ScrollReveal>

          {news.length > 0 ? (
            <div className="news-grid">
              {news.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.1}>
                  <Card className="news-card">
                    <div className="news-thumbnail">{item.icon}</div>
                    <p className="news-date">{formatDate(item.date)}</p>
                    <h3 className="news-item-title">{item.title}</h3>
                    <p className="news-summary">{item.summary}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="お知らせがありません"
              message="現在、掲載されているお知らせはありません。"
              icon="📢"
              action={
                <Button variant="primary" onClick={() => window.location.reload()}>
                  再読み込み
                </Button>
              }
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const revalidate = 60
import { getSocialLinks } from '@/lib/microcms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import './styles.css'

/**
 * コミュニティページ
 */
export default async function CommunityPage() {
  const socialLinks = await getSocialLinks()

  return (
    <div className="community-page">
      <Header />
      
      <main className="community-main">
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal>
            <h1 className="community-title">コミュニティ</h1>
            <p className="community-subtitle">
              原神学園のコミュニティに参加しよう
            </p>
          </ScrollReveal>

          {socialLinks.length > 0 ? (
            <div className="community-links">
              {socialLinks.map((link, index) => (
                <ScrollReveal key={link.id} delay={index * 0.1}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="community-link-wrapper"
                  >
                    <Button
                      variant="secondary"
                      size="large"
                      className="community-link-button"
                    >
                      <span className="community-link-icon">{link.icon}</span>
                      <span>{link.name}</span>
                    </Button>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="コミュニティリンクがありません"
              message="現在、登録されているコミュニティリンクはありません。"
              icon="🌐"
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
'use client'

import { useState, useEffect } from 'react'
import { getMediaItems, type MediaItem } from '@/lib/microcms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import './styles.css'

/**
 * 純粋関数: タブクラス名を生成
 */
const getTabClass = (isActive: boolean): string => {
  return isActive
    ? 'media-tab media-tab-active'
    : 'media-tab'
}

/**
 * メディアページ（クライアントコンポーネント）
 */
export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMediaItems().then((items) => {
      setMediaItems(items)
      setLoading(false)
    })
  }, [])

  const filteredItems = mediaItems.filter((item) => item.type === activeTab)

  if (loading) {
    return (
      <div className="media-page">
        <Header />
        <main className="media-main">
          <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-text">読み込み中...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="media-page">
      <Header />
      
      <main className="media-main">
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal>
            <h1 className="media-title">メディア</h1>
            <p className="media-subtitle">動画とイラストのギャラリー</p>
          </ScrollReveal>

          <div className="media-tabs">
            <button
              className={getTabClass(activeTab === 'videos')}
              onClick={() => setActiveTab('videos')}
            >
              動画
            </button>
            <button
              className={getTabClass(activeTab === 'images')}
              onClick={() => setActiveTab('images')}
            >
              イラスト
            </button>
          </div>

          {filteredItems.length > 0 ? (
            <div className="media-grid">
              {filteredItems.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.1}>
                  <div className="media-item">
                    <div className="media-thumbnail">{item.icon}</div>
                    <p className="media-item-title">{item.title}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title={`${activeTab === 'videos' ? '動画' : 'イラスト'}がありません`}
              message={`現在、掲載されている${activeTab === 'videos' ? '動画' : 'イラスト'}はありません。`}
              icon={activeTab === 'videos' ? '🎬' : '🖼️'}
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
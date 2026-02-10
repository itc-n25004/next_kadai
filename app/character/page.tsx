import { getCharacters, Character } from '@/lib/microcms';
import Link from 'next/link';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function CharacterPage() {
  const data = await getCharacters();
  const characters: Character[] = data.contents || [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">
          キャラクター
        </h1>

        {characters.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-genshin max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">
                キャラクター情報準備中
              </h2>
              <p className="text-gray-300 mb-6">
                現在、キャラクター情報を準備しています。
                <br />
                microCMSでキャラクターデータを登録してください。
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-400 mb-2">必要なフィールド：</p>
                <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>name (テキスト): キャラクター名</li>
                  <li>title (テキスト): 称号</li>
                  <li>element (テキスト): 元素</li>
                  <li>weapon (テキスト): 武器</li>
                  <li>rarity (数値): レアリティ (1-5)</li>
                  <li>description (テキストエリア): 説明</li>
                  <li>image (画像): キャラクター画像</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <div key={character.id} className="card-genshin group">
                <div className="aspect-square bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg mb-4 overflow-hidden">
                  {character.image?.url ? (
                    <img
                      src={character.image.url}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      ⭐
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-300 group-hover:text-purple-300 transition-colors">
                    {character.name}
                  </h3>
                  
                  {character.title && (
                    <p className="text-sm text-gray-400">{character.title}</p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-800/50 rounded text-blue-300">
                      {character.element || '元素'}
                    </span>
                    <span className="px-2 py-1 bg-purple-800/50 rounded text-purple-300">
                      {character.weapon || '武器'}
                    </span>
                  </div>
                  
                  {character.rarity && (
                    <div className="flex gap-1">
                      {Array.from({ length: character.rarity }).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  )}
                  
                  {character.description && (
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {character.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

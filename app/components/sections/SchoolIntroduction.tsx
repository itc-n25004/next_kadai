"use client";

import Link from "next/link";
import { Country } from "@/lib/microcms";
import { getImageUrl } from "@/lib/utils";
import { COUNTRY_ORDER } from "@/lib/constants";
import ScrollReveal from "../ui/ScrollReveal";

type SchoolIntroductionProps = {
  countries: Country[];
};

/**
 * 学園紹介セクションコンポーネント
 * 各学園（国）を紹介するセクション
 * @returns {JSX.Element} 学園紹介セクション
 */
export default function SchoolIntroduction({
  countries,
}: SchoolIntroductionProps) {
  // COUNTRY_ORDERに従って国を並べ替える
  const countryMap = new Map(countries.map((c) => [c.title.trim(), c]));
  const sortedCountries = COUNTRY_ORDER.map((countryName) =>
    countryMap.get(countryName.trim()),
  ).filter((country): country is Country => country !== undefined);

  // 最大表示数（PC: 4枚、タブレット: 3枚、モバイル: 1枚）
  const MAX_VISIBLE = 4;

  return (
    <section id="academy-info" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          学園紹介
        </h2>

        {/* 横スクロール可能なカードコンテナ */}
        <div className="relative -mx-4 px-4">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {sortedCountries.map((country, index) => (
                <div key={country.id} className="flex-shrink-0 w-80">
                  <ScrollReveal>
                    <Link
                      href="/academy"
                      className="block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col h-full"
                    >
                      {getImageUrl(country.co_image) && (
                        <div className="relative overflow-hidden flex-1">
                          <img
                            src={getImageUrl(country.co_image)}
                            alt={country.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {country.title}
                        </h3>
                        <p className="text-white/80 line-clamp-3">
                          {country.discription || "学園の詳細は準備中です。"}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>

          {/* スクロールヒント */}
          {sortedCountries.length > MAX_VISIBLE && (
            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">
                ← → 横にスクロールして他の学園を見る
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/academy"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300"
          >
            すべての学園を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

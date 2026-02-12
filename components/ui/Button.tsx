import { type ReactNode } from "react";

/**
 * 純粋関数: ボタンのバリアント（見た目の種類）に基づいたクラス名を生成
 * @param {('primary'|'secondary')} variant - ボタンのバリアント
 * @returns {string} バリアントに応じたクラス名
 */
const getButtonVariantClass = (variant: "primary" | "secondary"): string => {
  const variants = {
    primary: "bg-yellow-500 text-black hover:bg-yellow-400",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
  };
  return variants[variant];
};

/**
 * 純粋関数: ボタンのサイズに基づいたクラス名を生成
 * @param {('small'|'medium'|'large')} size - ボタンのサイズ
 * @returns {string} サイズに応じたクラス名
 */
const getButtonSizeClass = (size: "small" | "medium" | "large"): string => {
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };
  return sizes[size];
};

/**
 * ボタンコンポーネントのプロパティ型定義
 */
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
};

/**
 * 再利用可能なボタンコンポーネント
 * バリアントとサイズをカスタマイズ可能
 * ホバーエフェクトとスケールアニメーション付き
 * @param {ButtonProps} props - ボタンのプロパティ
 * @returns {JSX.Element} ボタン要素
 */
export default function Button({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
}: ButtonProps) {
  const variantClass = getButtonVariantClass(variant);
  const sizeClass = getButtonSizeClass(size);
  const buttonClass = `${variantClass} ${sizeClass} ${className} rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

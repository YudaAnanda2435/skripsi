const ScanAnimationStyle = () => (
  <style>{`
    .scan-line {
      animation: scan-line 2.6s ease-in-out infinite;
    }
    .ai-box {
      animation: ai-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .ai-shimmer {
      animation: ai-shimmer 1.1s linear infinite;
    }
    @keyframes scan-line {
      0% { transform: translateY(-120%); opacity: 0; }
      12% { opacity: 1; }
      88% { opacity: 1; }
      100% { transform: translateY(460%); opacity: 0; }
    }
    @keyframes ai-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 rgba(179, 241, 197, 0); }
      50% { opacity: .52; box-shadow: 0 0 22px rgba(179, 241, 197, .65); }
    }
    @keyframes ai-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `}</style>
);

export default ScanAnimationStyle;

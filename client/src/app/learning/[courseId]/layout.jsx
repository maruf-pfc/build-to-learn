export default function LearningLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 text-foreground flex flex-col">
      {children}
    </div>
  );
}

export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }
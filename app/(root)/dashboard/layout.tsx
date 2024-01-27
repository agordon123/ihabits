import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex background-light700_dark400 min-h-fit min-w-fit">
      {children}
    </main>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} Coffeein. All rights reserved.
      </div>
    </footer>
  );
}

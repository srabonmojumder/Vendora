import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-[100px] leading-none text-brand sm:text-[140px]">
        404
      </p>
      <h1 className="mt-4 font-display text-[26px] text-heading-soft sm:text-[34px]">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-[15px] font-light text-body">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to discovering beautiful fragrances.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back To Home
      </Link>
    </main>
  );
}

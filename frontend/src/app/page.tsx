import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to sectors page - Next.js handles basePath automatically
  redirect('/sectors/');
}

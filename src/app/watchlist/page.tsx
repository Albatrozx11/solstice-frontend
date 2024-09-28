"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/utils';
export default function page() {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect if not authenticated
    }
  }, [router]);
  return (
    <div>page</div>
  )
}

'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Logic to handle logout
    console.log('User logged out');
    router.push('/'); // Redirect to the home page or login page
  };

  return (
    <button
      className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-crosshair'
      style={{
        backgroundColor: '#8E9CC9',
        flex: 1,
        flexBasis: 0,
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

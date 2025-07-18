'use client';

type LogoutButtonProps = {
  onLogout: () => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <button
      className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-pointer'
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

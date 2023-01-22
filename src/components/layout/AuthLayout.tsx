import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <div className='flex justify-content-center align-items-center min-h-screen p-2'>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;

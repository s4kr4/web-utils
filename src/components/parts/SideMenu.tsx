import Link from 'next/link';

const menuList = [
  { name: 'top', path: '/' },
  { name: 'Lives', path: '/lives' },
];

export const SideMenu = () => {
  return (
    <nav className="h-screen w-72 bg-gray-900 text-white">
      <ul className="p-5 pt-10">
        {menuList.map((menu) => (
          <li key={menu.name}>
            <Link href={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

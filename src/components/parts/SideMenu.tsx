import Link from 'next/link';

const menuList = [
  { name: 'Top Page', path: '/' },
  { name: 'Lives', path: '/lives' },
];

export const SideMenu = () => {
  return (
    <nav className="p-5 h-screen w-72 bg-gray-900 text-white">
      <div className="text-2xl">Web Utils</div>
      <ul className="pt-5">
        {menuList.map((menu) => (
          <li
            key={menu.name}
            className="p-4 rounded-md font-bold cursor-pointer hover:bg-gray-800"
          >
            <Link href={menu.path}>- {menu.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

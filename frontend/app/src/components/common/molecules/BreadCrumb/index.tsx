
import Link from "next/link";


type BreadcrumbItem = {
  label: string;
  href: string;
}

type BreadcrumbProps = {
  items: BreadcrumbItem[];
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;

  return (
    <nav className="text-sm mb-4">
      <ul className="flex items-center space-x-2">
        {items && items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href}>
                <span className="text-teal-400 hover:underline cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

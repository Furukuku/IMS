import { Link, usePage } from "@inertiajs/react";
import StudentCategoryItem from "./StudentCategoryItem";


const StudentCategories = () => {
  const categoryLinks = [
    {
      name: 'All',
      url: '/students',
      param: ''
    },
    {
      name: 'Actives',
      url: '/students?status=Active',
      param: 'Active'
    },
    {
      name: 'Archives',
      url: '/students?status=Archive',
      param: 'Archive'
    },
    {
      name: 'Approval',
      url: '/students?status=Approval',
      param: 'Approval'
    },
  ];

  return (
    <section>
      <p className="text-xl font-medium mb-3">All Students</p>
      <ul className="flex gap-3">
        {categoryLinks.map(link => (
          <StudentCategoryItem
            key={link.name}
            name={link.name}
            url={link.url}
            param={link.param}
          />
        ))}
      </ul>
    </section>
  );
};

export default StudentCategories;

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function ClientProjectsPage() {
  const projects = [
    { id: 'project01', name: 'Cool Project' },
    { id: 'project02', name: 'Cooler Project' },
    { id: 'project03', name: 'Best Project' },
  ];

  const router = useRouter();
  const { id } = router.query;

  console.log(router.pathname);

  const handleButtonClick = (projectId) => {
    //   Like using Link component:
    router.push(`/clients/${id}/${projectId}`);
  };

  return (
    <div>
      <h1>Project Page for Client {id}</h1>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <Link href={`/clients/${id}/${project.id}`}>{project.name}</Link>
              <button onClick={() => handleButtonClick(project.id)}>Navigate Programmatically</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientProjectsPage;

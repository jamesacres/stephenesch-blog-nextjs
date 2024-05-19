interface Project {
  title: string;
  description: string;
  href?: string;
  imgSrc?: string;
}

const projectsData: Project[] = [
  {
    title: 'Music Rating',
    description: `This site lists my music ratings`,
  },
  {
    title: 'Cookbook',
    description: `Collection of my favourite recipes`,
  },
  {
    title: 'Final Fantasy',
    description: `100% completion`,
  },
  {
    title: 'Zelda',
    description: `100% completion`,
  },
];

export default projectsData;

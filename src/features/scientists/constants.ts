import type { Scientist } from '../../types';

export const scientists: Scientist[] = [
  {
    id: 1,
    name: "EMRE BRAY",
    title: "Logistics",
    photo: "/assets/scientist1",
    logistics: { current: 1, max: 4 },
    genetics: { current: 2, max: 5 },
    welfare: { current: 1, max: 5 },
    trait: "Motivated",
    traitDescription: "Increases Unrest limit by 4",
    bio: "Raised in the city, Emre Bray often visited the local natural history museum. Her interest in scientific development led her to a career in palaeontology.",
    salary: 1500,
    trainingLevel: 1
  },
  {
    id: 2,
    name: "PATRICK CROWTHER",
    title: "Logistics",
    photo: "/assets/scientist2",
    logistics: { current: 1, max: 5 },
    genetics: { current: 2, max: 3 },
    welfare: { current: 2, max: 5 },
    trait: "Cheaper Research",
    traitDescription: "Reduces the cost of Research tasks by 30%",
    bio: "Patrick took a Maths degree before focusing on his love of dinosaurs. Patrick formed a palaeontology club for fellow dinosaur fans at school.",
    salary: 1700,
    trainingLevel: 1
  },
  {
    id: 3,
    name: "HYEJIN SEO",
    title: "Logistics",
    photo: "/assets/scientist3",
    logistics: { current: 1, max: 5 },
    genetics: { current: 1, max: 3 },
    welfare: { current: 4, max: 9 },
    trait: "Welfare Specialist",
    traitDescription: "Increases Welfare Potential by 5 and Welfare Skill by 3",
    bio: "HyeJin Seo was born in a coastal town famous for dinosaur discoveries. She completed a degree in English Literature from Jadavpur University in India.",
    salary: 1000,
    trainingLevel: 1
  },
  {
    id: 4,
    name: "ANEEGA SAFAR",
    title: "Logistics",
    photo: "/assets/scientist4",
    logistics: { current: 2, max: 8 },
    genetics: { current: 1, max: 3 },
    welfare: { current: 0, max: 4 },
    trait: "Altruistic Salary",
    traitDescription: "Reduces the salary by 50%",
    bio: "Aneega Safar loved dinosaurs as a child and visited local dig sites to learn more. Aneega's intelligence and drive have led to two successive promotions.",
    salary: 1000,
    trainingLevel: 1
  }
];

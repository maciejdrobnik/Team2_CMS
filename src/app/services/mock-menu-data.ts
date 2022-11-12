export interface Page {
  id: number,
  name: string,
  subpages?: Page[]
}

export const MENU_DATA: Page[] = [
  {id: 1, name: 'Mathematics', subpages: [
      {id: 11, name: 'Trigonometry', subpages: [
          {id: 111, name: 'Basic Trigonometry'}
        ]}
    ]},
  {id: 2, name: 'Physics', subpages: [
      {id: 20, name: "Newton's Laws of Dynamics"},
      {id: 21, name: 'Coordinate systems', subpages: [
          {id: 211, name: 'Cartesian'},
          {id: 212, name: 'Polar'},
        ]},
      {id: 22, name: 'Wave equation', subpages: [
          {id: 221, name: 'One-dimensional travelling wave'},
        ]}
    ]},
  {id: 3, name: 'Numerical Methods'},
  {
    id: 4, name: 'Electronics', subpages: [
      {id: 41, name: "Ohm's Law"},
    ]
  }
  ];

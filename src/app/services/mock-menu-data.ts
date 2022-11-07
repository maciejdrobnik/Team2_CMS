export interface Page {
  id: number,
  name: string,
  subpages?: Page[],
  filename?: string
}

export const MENU_DATA: Page[] = [
  {id: 1, name: 'Category 1', subpages: [
      {id: 11, name: 'SubPage 1', subpages: [
          {id: 111, name: 'Page 1'}
        ]}
    ]},
  {id: 2, name: 'Category 2', subpages: [
      {id: 20, name: 'Page 0'},
      {id: 21, name: 'SubPage 1', subpages: [
          {id: 211, name: 'Page 1'},
          {id: 212, name: 'Page 2'},
        ]},
      {id: 22, name: 'SubPage 2', subpages: [
          {id: 221, name: 'Page 1'},
        ]}
    ]},
  {id: 3, name: 'Category 3'},
  {
    id: 4, name: 'Category 4', subpages: [
      {id: 41, name: 'Page 1'},
    ]
  }
  ];

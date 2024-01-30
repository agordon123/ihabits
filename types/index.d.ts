export interface SidebarLink {
  imgURL?: string;
  route: string;
  label: string;
}
export interface NavLink {
  name: string;
  route: string;
  needsAuth?: boolean;
  userId?: string;
}
export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

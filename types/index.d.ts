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
export interface NylasDeltaResponse {
  deltas: Array<{
    object: string;
    type: string;
    source: string;
    id: string;
    time: number;
    object_data: {
      namespace_id: string;
      account_id: string;
      object: string;
      attributes: null; // Assuming it's always null based on the provided example, adjust if it can have other types
      id: string;
      metadata: null; // Assuming it's always null based on the provided example, adjust if it can have other types
    };
  }>;
}

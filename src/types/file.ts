export interface UserInfo {
  name: string;
  avatar?: string;
}

export interface LinkedResources {
  orderId: string;
  orderDate: string;
  customerName: string;
  deliveryDate: string;
  relatedResourceName: string;
  relatedResourceUrl: string;
}

export interface FileDTO {
  id: string;
  uuid: string;
  name: string;
  size: number;
  type: string;
  format: string;
  createdBy: UserInfo;
  createdAt: string;
  modifiedBy: UserInfo;
  modifiedAt: string;
  lastModified: string;
  accessLevel: string[];
  linkedResources?: LinkedResources;
  category: string;
  status: 'active' | 'archived' | 'deleted';
  customTag?: {
    favorite?: boolean;
    pinned?: boolean;
    status?: 'Active' | 'Archived' | 'Deleted';
    createdBy?: string;
    modifiedBy?: string;
  };
}

export interface LinkedResourceDTO {
  id: string;
  name: string;
  type: string;
  // Add other fields as needed based on the API response
}

export interface CreateFileShareDTO {
  userId: string;
  userName: string;
  permission: string;
}

export interface FileShareDTO extends CreateFileShareDTO {
  id: string;
}

export interface FileFilter {
  search?: string;
  category?: string;
  sortBy?: 'name' | 'size' | 'lastModified';
  sortOrder?: 'asc' | 'desc';
} 
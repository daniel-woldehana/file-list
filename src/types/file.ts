export interface FileDTO {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: string;
  category: string;
  customTag?: any;
  uuid: string;
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